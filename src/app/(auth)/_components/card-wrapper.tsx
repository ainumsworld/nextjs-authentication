import { Card, CardBody } from "@nextui-org/card";

type Props = {
  children: React.ReactNode;
};

export const CardWrapper = ({ children }: Props) => {
  return (
    <>
      <Card
        className="border-none w-full max-w-[460px]"
        shadow="none"
      >
        <CardBody className="px-8 py-10">{children}</CardBody>
      </Card>
    </>
  );
};
