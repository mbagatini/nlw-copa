import { faker } from "@faker-js/faker";

import { prisma } from "../src/database/prisma";

async function main() {
	const users = [];
	const games = [];
	const countriesCodes = [
		"BR", "AE", "JP", "AM", "BE", "CL", "CR", "CO", "DE", "EC", "ES", "EG", "FR", "GF", "GR", "GT", "HR", "IT", "KM", "MA", "MX", "NO", "PR", "QA",
	];

	// create users
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

		users.push(user.id);
	}

	// create games without guesses
	for (let index = 0; index < 15; index++) {
		const game = await prisma.game.create({
			data: {
				date: faker.date.future(),
				firstTeamCountryCode: faker.helpers.arrayElement(countriesCodes),
				secondTeamCountryCode: faker.helpers.arrayElement(countriesCodes)
			}
		});

		games.push(game.id);
	}

	for (let index = 0; index < 5; index++) {
		const user = faker.helpers.arrayElement(users);

		const poll = await prisma.poll.create({
			data: {
				title: faker.music.songName(),
				code: faker.datatype.uuid().substring(0, 7).toUpperCase(),
				ownerId: user,
				participants: {
					create: { userId: user }
				}
			}
		});

		for (let j = 0; j < 5; j++) {
			try {
				await prisma.guess.create({
					data: {
						firstTeamPoints: faker.datatype.number({ min: 0, max: 9 }),
						secondTeamPoints: faker.datatype.number({ min: 0, max: 9 }),

						game: {
							connect: {
								id: faker.helpers.arrayElement(games)
							}
						},

						participant: {
							create: {
								pollId: poll.id,
								userId: faker.helpers.arrayElement(users)
							}
						}
					}
				});
			} catch (error) {
				console.log(error)
				j--;
			}
		}
	}
}

main();