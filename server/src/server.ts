import cors from '@fastify/cors';
import Fastify from 'fastify';
import jwt from '@fastify/jwt';

import { guessRoutes } from './routes/guess';
import { pollRoutes } from './routes/poll';
import { gamesRoutes } from './routes/game';
import { userRoutes } from './routes/user';
import { authRoutes } from './routes/auth';

async function bootstrap() {
	const fastify = Fastify({
		logger: true,
	});

	await fastify.register(cors, { origin: true });

	fastify.register(jwt, {
		secret: process.env.JWT_SECRET || 'supersecret'
	});

	fastify.register(authRoutes);
	fastify.register(pollRoutes);
	fastify.register(guessRoutes);
	fastify.register(gamesRoutes);
	fastify.register(userRoutes);

	await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();