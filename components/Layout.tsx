import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center w-full px-2">
      <main className="max-w-screen-lg">{children}</main>
    </div>
  );
}
