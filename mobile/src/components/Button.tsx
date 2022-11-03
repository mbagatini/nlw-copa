import { Button as BaseButton, IButtonProps, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";

interface ButtonProps extends IButtonProps {
	children: React.ReactNode;
	color?: ColorType;
}

export function Button({ children, color = "yellow.500", ...rest }: ButtonProps) {
	const [name, tone] = color.toString().split('.');
	const darkerColor = name + "." + (tone + 100);

	return (
		<BaseButton w="full"
			h={14}
			rounded="sm"
			fontSize="md"
			textTransform="uppercase"
			color={color}
			_pressed={{
				bg: darkerColor
			}}
			{...rest}
		>
			<Text fontSize="sm" fontFamily="heading" color="white">{children}</Text>
		</BaseButton>
	)
}