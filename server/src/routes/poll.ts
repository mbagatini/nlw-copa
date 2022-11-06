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
					},
					// number of participants
					_count: {
						select: {
							participants: true
						}
					},
					// user info of first 4 participants
					participants: {
						select: {
							id: true,
							user: {
								select: {
									avatarUrl: true
								}
							}
						},
						take: 4
					}
				}
			});

			return polls;
		}
	)

	fastify.get('/polls/all', async () => {
		const polls = await prisma.poll.findMany();
		return polls;
	})

	fastify.get('/polls/count', async () => {
		const count = await prisma.poll.count();
		return { count };
	})

	fastify.get('/polls/:id',
		{ onRequest: [authenticate] },
		async (req, res) => {
			const { id } = req.params as { id: string };

			if (!id) {
				return res.status(400).send({ message: "An id must be provided" });
			}

			try {
				const poll = await prisma.poll.findUniqueOrThrow({
					where: { id },
					include: {
						owner: {
							select: { name: true }
						},
						// number of participants
						_count: {
							select: {
								participants: true
							}
						},
						// user info of first 4 participants
						participants: {
							select: {
								id: true,
								user: {
									select: {
										avatarUrl: true
									}
								}
							},
							take: 4
						}
					}
				});

				return { poll };
			} catch (error) {
				return res.status(404).send({ message: "Poll not found" });
			}
		}
	)

	fastify.post('/polls', async (req, res) => {
		const createPollBody = z.object({
			title: z.string(),
		});

		let data;
		const generateUid = new ShortUniqueId({ length: 6 });

		try {
			data = createPollBody.parse(req.body);
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).send(error.flatten().fieldErrors)
			}

			return res.status(400).send();
		}

		// Try to check if user is authenticated
		try {
			await authenticate(req);
		} catch (error) {
			// ignore if the user is not authenticated
		}

		const poll = await prisma.poll.create({
			data: {
				...data,
				code: String(generateUid()).toUpperCase(),

				// Add data from user authenticated
				...(req?.user?.sub && {
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

	fastify.post('/polls/:id/join',
		{ onRequest: [authenticate] },
		async (req, res) => {
			const { id } = req.params as { id: string };

			if (!id) {
				return res.status(400).send({ message: "An id must be provided" });
			}

			let poll;

			try {
				poll = await prisma.poll.findUniqueOrThrow({
					where: { id },
					include: {
						participants: {
							where: { userId: req.user.sub }
						}
					}
				});
			} catch (error) {
				return res.status(404).send({ message: "Poll not found" });
			}

			if (poll.participants.length > 0) {
				return res.status(400).send({ message: "You already joined this poll" });
			}

			await prisma.participant.create({
				data: {
					pollId: poll.id,
					userId: req.user.sub
				}
			});

			return res.status(201).send();
		}
	)
}