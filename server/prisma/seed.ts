import { prisma } from "../src/database/prisma";

async function main() {
	const user = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'john@doe.com',
			avatarUrl: 'https://avatars.dicebear.com/api/micah/avavavavav.svg',
			googleId: 'myfakeid'
		}
	});

	const poll = await prisma.poll.create({
		data: {
			title: 'The great winner',
			code: 'WEHEX4',
			ownerId: user.id,
			participants: {
				create: { userId: user.id }
			}
		}
	});

	// create game without guesses
	await prisma.game.create({
		data: {
			date: '2022-12-08T16:00:00.737Z',
			teamACountryCode: 'BR',
			teamBCountryCode: 'JP'
		}
	});

	// create game with a guess
	await prisma.game.create({
		data: {
			date: '2022-12-12T12:00:00.737Z',
			teamACountryCode: 'BR',
			teamBCountryCode: 'MX',

			guesses: {
				create: {
					teamAPoints: 3,
					teamBPoints: 1,
					participant: {
						connect: {
							userId_pollId: {
								pollId: poll.id,
								userId: user.id
							}
						}
					}
				}
			}
		}
	});
}

main();