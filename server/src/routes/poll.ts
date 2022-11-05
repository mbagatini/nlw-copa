import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { prisma } from "../database/prisma";
import { authenticate } from "../plugins/auth";

export async function pollRoutes(fastify: FastifyInstance) {
	fastify.get('/polls',
		{ onRequest: [authenticate] },
		async (req, res) => {
			const polls = await prisma.poll.findMany({
				where: {
					participants: {
						some: {
							userId: req.user.sub
						}
					}
				},
				include: {
					owner: {
						select: { name: true }
					}
				}
			});

			return polls;
		}
	)
		const polls = await prisma.poll.findMany();
		return polls;
	})

	fastify.post('/polls', async (req, res) => {
		const createPollBody = z.object({
			title: z.string(),
		});

		var data;
		const generateUid = new ShortUniqueId({ length: 6 });

		try {
			data = createPollBody.parse(req.body);
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).send(error.flatten().fieldErrors)
			}

			return res.status(400);
		}

		// Try to check if user is authenticated
		try {
			authenticate(req);
		} catch (error) {
			// ignore if the user is not authenticated
		}

		const poll = await prisma.poll.create({
			data: {
				...data,
				code: String(generateUid()).toUpperCase(),

				// Add data from user authenticated
				...(req.user.sub && {
					ownerId: req.user.sub,

					participants: {
						create: {
							userId: req.user.sub
						}
					}
				})
			}
		});

		return res.status(201).send(poll);
	})

	fastify.get('/polls/count', async () => {
		const count = await prisma.poll.count();
		return { count };
	})
}