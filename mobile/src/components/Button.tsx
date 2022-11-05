import { Button as BaseButton, IButtonProps, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";

interface ButtonProps extends IButtonProps {
	children: string;
	color?: ColorType;
	titleColor?: ColorType;
}

export function Button({ children, color = "yellow.500", titleColor = "black", ...rest }: ButtonProps) {
	const [name, tone] = color.toString().split('.');
	const darkerTone = Number(tone) + (Number(tone) < 900 ? 100 : -100);
	const darkerColor = name + "." + darkerTone;

	return (
		<BaseButton
			w="full"
			padding={5}
			rounded="sm"
			fontSize="md"
			textTransform="uppercase"
			bg={color}
			_pressed={{
				bg: darkerColor
			}}
			{...rest}
		>
			<Text fontSize="sm" fontFamily="heading" color={titleColor}>{children}</Text>
		</BaseButton>
	)
}