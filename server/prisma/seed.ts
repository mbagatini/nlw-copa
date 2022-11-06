import { faker } from "@faker-js/faker";

import { prisma } from "../src/database/prisma";

async function main() {
	// create game without guesses
	await prisma.game.create({
		data: {
			date: '2022-12-08T16:00:00.737Z',
			teamACountryCode: 'BR',
			teamBCountryCode: 'JP'
		}
	});

	for (let index = 0; index <= 15; index++) {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();

		const userFake = {
			name: firstName + " " + lastName,
			email: faker.internet.email(firstName, lastName),
			avatarUrl: `https://avatars.dicebear.com/api/micah/${faker.random.word()}.svg`,
			googleId: faker.datatype.uuid()
		};

		const user = await prisma.user.create({
			data: userFake
		});

		const poll = await prisma.poll.create({
			data: {
				title: faker.music.songName(),
				code: faker.datatype.uuid().substring(0, 7).toUpperCase(),
				ownerId: user.id,
				participants: {
					create: { userId: user.id }
				}
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




}

main();