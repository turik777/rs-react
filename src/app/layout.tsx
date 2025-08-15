import '../../globals.scss';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
