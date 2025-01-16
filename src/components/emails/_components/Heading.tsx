import {
  Heading as ReactEmailHeading,
  type HeadingProps,
} from "@react-email/components";

type Props = HeadingProps;

export const Heading = ({ children, className, ...other }: Props) => {
  return (
    <ReactEmailHeading
      as="h1"
      className={`text-2xl text-slate-950 font-semibold ${className}`}
      {...other}
    >
      {children}
    </ReactEmailHeading>
  );
};
