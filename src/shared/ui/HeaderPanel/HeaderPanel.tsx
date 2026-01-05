'use client'
export default function HeaderPanel({
  children,
}: Readonly<{
  children?: React.ReactNode | undefined;
}>) {
  return (
    <div className="min-h-[52px]">
      {children}
    </div> 
  );
}