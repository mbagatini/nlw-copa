import { FastifyInstance } from "fastify";
import { prisma } from "../database/prisma";
import { authenticate } from "../plugins/auth";

export async function gamesRoutes(fastify: FastifyInstance) {
	fastify.get('/polls/:id/games',
		{ onRequest: [authenticate] },
		async (req, res) => {
			const { id } = req.params as { id: string };

			if (!id) {
				return res.status(400).send({ message: "An id must be provided" });
			}

			const games = await prisma.game.findMany({
				orderBy: {
					date: 'desc'
				},
				include: {
					guesses: {
						where: {
							participant: {
								pollId: id,
								userId: req.user.sub
							}
						}
					}
				}
			});

			return {
				games: games.map(game => {
					return {
						...game,
						guess: game.guesses.length > 0 ? game.guesses[0] : null,
						guesses: undefined
					}
				})
			};
		}
	)
}