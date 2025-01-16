import { Section, Text, type TextProps } from "@react-email/components";

type Props = TextProps;

export const Code = ({ children, className, ...other }: Props) => {
  return (
    <Section className="bg-slate-100 px-6 py-4 text-center rounded-md shadow-sm">
      <Text
        className={`font-mono font-bold text-slate-950 text-3xl tracking-widest ${className}`}
        {...other}
      >
        {children}
      </Text>
    </Section>
  );
};
