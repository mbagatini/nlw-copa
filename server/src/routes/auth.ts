import { FastifyInstance } from "fastify";
import { z } from "zod";
import axios from "axios";

import { prisma } from "../database/prisma";
import { authenticate } from "../plugins/auth";

export async function authRoutes(fastify: FastifyInstance) {
	fastify.get('/me',
		{ onRequest: [authenticate] },
		async (req, res) => {
			await req.jwtVerify();

			return { user: req.user };
		}
	)

	fastify.post('/auth', async (req, res) => {
		const authBody = z.object({
			access_token: z.string(),
		});

		let accessToken;

		try {
			accessToken = authBody.parse(req.body).access_token;
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).send(error.flatten().fieldErrors)
			}

			return res.status(400);
		}

		const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		const userData = userResponse.data;

		const userInfoSchema = z.object({
			id: z.string(),
			email: z.string().email(),
			name: z.string(),
			picture: z.string().url(),
		});

		let userInfo;

		try {
			userInfo = userInfoSchema.parse(userData);
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).send(error.flatten().fieldErrors)
			}

			return res.status(400);
		}

		let user = await prisma.user.findUnique({
			where: { googleId: userInfo.id }
		});

		if (!user) {
			user = await prisma.user.create({
				data: {
					name: userInfo.name,
					email: userInfo.email,
					googleId: userInfo.id,
					avatarUrl: userInfo.picture,
				}
			});
		}

		// Generate JWT token
		const JWTtoken = fastify.jwt.sign({
			name: user.name,
			avatarUrl: user.avatarUrl,
		}, {
			sub: user.id,
			expiresIn: '2 days'
		})

		return { token: JWTtoken };
	})
}