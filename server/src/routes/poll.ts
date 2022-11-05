import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { prisma } from "../database/prisma";

export function pollRoutes(fastify: FastifyInstance) {
	fastify.get('/polls', async () => {
		const polls = await prisma.poll.findMany();
		return polls;
	})

	fastify.post('/polls', async (req, res) => {
		const createPollBody = z.object({
			title: z.string(),
			ownerId: z.string().cuid().optional()
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

		const poll = await prisma.poll.create({
			data: {
				...data,
				code: String(generateUid()).toUpperCase()
			}
		});

		return res.status(201).send(poll);
	})

	fastify.get('/polls/count', async () => {
		const count = await prisma.poll.count();
		return { count };
	})
}