import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Frontend Mentor | Typing Speed Test</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
