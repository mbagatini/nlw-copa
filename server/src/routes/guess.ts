import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../database/prisma";
import { authenticate } from "../plugins/auth";

export async function guessRoutes(fastify: FastifyInstance) {
	fastify.get('/guesses/count', async () => {
		const count = await prisma.guess.count();
		return { count };
	})

	fastify.post('/polls/:pollId/games/:gameId/guess',
		{ onRequest: [authenticate] },
		async (req, res) => {
			// get body
			const guessBody = z.object({
				teamAPoints: z.number(),
				teamBPoints: z.number(),
			});

			let guessData;
			try {
				guessData = guessBody.parse(req.body);
			} catch (error) {
				if (error instanceof z.ZodError) {
					return res.status(400).send(error.flatten().fieldErrors)
				}

				return res.status(400).send();
			}

			// get params
			const paramsValidation = z.object({
				pollId: z.string().cuid(),
				gameId: z.string().cuid(),
			});

			let params;
			try {
				params = paramsValidation.parse(req.params);
			} catch (error) {
				if (error instanceof z.ZodError) {
					return res.status(400).send(error.flatten().fieldErrors)
				}

				return res.status(400).send();
			}

			// validations
			let participant;
			try {
				participant = await prisma.participant.findUniqueOrThrow({
					where: {
						userId_pollId: {
							pollId: params.pollId,
							userId: req.user.sub
						}
					}
				})
			} catch (error) {
				return res.status(400).send({ message: 'You do not belong to this poll' });
			}

			const checkGuess = await prisma.guess.findUnique({
				where: {
					participantId_gameId: {
						gameId: params.gameId,
						participantId: participant.id
					}
				}
			})

			if (checkGuess) {
				return res.status(400).send({ message: 'You already have a guess to this game' });
			}

			let game;
			try {
				game = await prisma.game.findUniqueOrThrow({
					where: {
						id: params.gameId
					}
				});
			} catch (error) {
				return res.status(400).send({ message: 'Game not found' });
			}

			if (game.date < new Date()) {
				return res.status(400).send({ message: 'Game already finished' });
			}

			// create guess
			await prisma.guess.create({
				data: {
					...guessData,
					gameId: params.gameId,
					participantId: participant.id
				}
			})

			return res.status(201).send();
		}
	)
}