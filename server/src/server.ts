import Fastify from 'fastify';
import cors from '@fastify/cors';

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

	await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();