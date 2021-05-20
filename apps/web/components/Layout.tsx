import React from 'react';

export default function Layout({
  children,
  fullWidth,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className="flex justify-center w-full px-2">
      <main className={fullWidth ? 'w-full' : 'max-w-screen-lg'}>
        {children}
      </main>
    </div>
  );
}
