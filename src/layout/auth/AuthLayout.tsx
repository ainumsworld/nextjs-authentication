type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen flex relative">
      <div className="overflow-auto fixed inset-0 bg-cover bg-no-repeat bg-center bg-[linear-gradient(to_bottom,rgba(20,26,33,0.82),rgba(20,26,33,0.82)),url(/images/background/bg-blur.webp)] ">
        <div className="p-6 w-full min-h-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </main>
  );
};
