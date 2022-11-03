import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';

import { prisma } from './database/prisma';

async function bootstrap() {
	const fastify = Fastify({
		logger: true,
	});

	await fastify.register(cors, { origin: true });

	fastify.get('/pools', async () => {
		const pools = await prisma.pool.findMany();
		return pools;
	})

	fastify.post('/pools', async (req, res) => {
		const createPoolBody = z.object({
			title: z.string(),
			ownerId: z.string().cuid().optional()
		});

		var data;
		const generateUid = new ShortUniqueId({ length: 6 });

		try {
			data = createPoolBody.parse(req.body);
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).send(error.flatten().fieldErrors)
			}

			return res.status(400);
		}

		const pool = await prisma.pool.create({
			data: {
				...data,
				code: String(generateUid()).toUpperCase()
			}
		});

		return res.status(201).send(pool);
	})

	fastify.get('/pools/count', async () => {
		const count = await prisma.pool.count();
		return count;
	})

	fastify.get('/users/count', async () => {
		const count = await prisma.user.count();
		return count;
	})

	fastify.get('/guesses/count', async () => {
		const count = await prisma.guess.count();
		return count;
	})

	await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();