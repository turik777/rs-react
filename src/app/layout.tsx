import '../globals.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
