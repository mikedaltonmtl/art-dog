import './globals.css';

export const metadata = {
  title: 'Art Dog',
  description: 'Photos of our new puppy',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
