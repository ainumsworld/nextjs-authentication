import { Text, type TextProps } from "@react-email/components";

type Props = TextProps;

export const Paragraph = ({ children, className, ...other }: Props) => {
  return (
    <Text
      className={`text-base text-slate-950 ${className}`}
      {...other}
    >
      {children}
    </Text>
  );
};
