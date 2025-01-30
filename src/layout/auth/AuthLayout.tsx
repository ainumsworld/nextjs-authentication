type Props = {
  children: React.ReactNode;
};

const url = "/images/background/cover-19.webp";

export const AuthLayout = ({ children }: Props) => {
  return (
    <main
      className="relative flex min-h-screen bg-cover bg-fixed bg-center bg-no-repeat before:absolute before:inset-0 before:backdrop-blur dark:before:bg-default-100/50"
      style={{ backgroundImage: `url(${url})` }}
    >
      <div className="z-10 flex min-h-full w-full flex-col items-center justify-center p-6">
        {children}
      </div>
    </main>
  );
};
