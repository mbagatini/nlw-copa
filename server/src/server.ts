import cors from '@fastify/cors';
import Fastify from 'fastify';

import { guessRoutes } from './routes/guess';
import { pollRoutes } from './routes/poll';
import { userRoutes } from './routes/user';

async function bootstrap() {
	const fastify = Fastify({
		logger: true,
	});

	await fastify.register(cors, { origin: true });

	fastify.register(pollRoutes);
	fastify.register(guessRoutes);
	fastify.register(userRoutes);

	await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();