export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="bg-main h-screen">
      <div className="container mx-auto px-2">{children}</div>
    </div>
  );
};
