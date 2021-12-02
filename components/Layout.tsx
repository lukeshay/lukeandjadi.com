import React from 'react';

export default function Layout({
  children,
  fullWidth,
  className,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <div className={`${className} flex justify-center w-full px-2`}>
      <main className={fullWidth ? 'w-full' : 'max-w-4xl'}>
        {children}
      </main>
    </div>
  );
}
