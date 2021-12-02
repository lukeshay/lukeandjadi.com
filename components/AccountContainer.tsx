import BaseContainer from './BaseContainer';

export interface ContainerProps {
  children: React.ReactNode;
}

export default function AccountContainer({ children }: ContainerProps) {
  return (
    <BaseContainer title="Luke & Jadi | Admin">
      <main className="min-h-screen">{children}</main>
    </BaseContainer>
  );
}
