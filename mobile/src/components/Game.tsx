import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';

import { Team } from './Team';
import { useState } from 'react';

interface GuessProps {
	id: string;
	gameId: string;
	createdAt: string;
	participantId: string;
	firstTeamPoints: number;
	secondTeamPoints: number;
}

export interface GameProps {
	id: string;
	firstTeamCountryCode: string;
	secondTeamCountryCode: string;
	date: Date;
	guess: null | GuessProps;
};

interface Props {
	data: GameProps;
	onGuessConfirm: () => Promise<void>;
	setFirstTeamPoints: (value: string) => void;
	setSecondTeamPoints: (value: string) => void;
};

export function Game({ data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const { colors, sizes } = useTheme();

	function handleGuessConfirm() {
		setIsLoading(true);
		onGuessConfirm().finally(() => {
			setIsLoading(false);
		})
	}

	return (
		<VStack
			w="full"
			bgColor="gray.800"
			rounded="sm"
			alignItems="center"
			borderBottomWidth={3}
			borderBottomColor="yellow.500"
			mb={3}
			p={4}
		>
			<Text color="gray.100" fontFamily="heading" fontSize="sm">
				{getName(data.firstTeamCountryCode)} vs. {getName(data.secondTeamCountryCode)}
			</Text>

			<Text color="gray.200" fontSize="xs">
				{/* it could be done with lib dayjs */}
				{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(data.date)}
			</Text>

			<HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
				<Team
					code={data.firstTeamCountryCode}
					position="right"
					value={data.guess?.firstTeamPoints.toString()}
					onChangeText={setFirstTeamPoints}
				/>

				<X color={colors.gray[300]} size={sizes[6]} />

				<Team
					code={data.secondTeamCountryCode}
					position="left"
					value={data.guess?.secondTeamPoints.toString()}
					onChangeText={setSecondTeamPoints}
				/>
			</HStack>

			{!data.guess && (
				<Button size="xs" w="full" bgColor="green.500" mt={4}
					onPress={handleGuessConfirm}
					isLoading={isLoading}
					_loading={{ _spinner: { color: "white" } }}
				>
					<HStack alignItems="center">
						<Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
							CONFIRMAR PALPITE
						</Text>

						<Check color={colors.white} size={sizes[4]} />
					</HStack>
				</Button>
			)}

			{data.date < new Date() && (
				<Button size="xs" w="full" bgColor="gray.600" mt={4}>
					<Text color="gray.300" fontSize="xs" fontFamily="heading" mr={3}>
						TEMPO ESGOTADO
					</Text>
				</Button>
			)}
		</VStack>
	);
}