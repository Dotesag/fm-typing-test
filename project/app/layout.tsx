import "./globals.css";
import localFont from 'next/font/local'

const sora = localFont({
  src: '../public/fonts/Sora-VariableFont_wght.ttf',
  weight: '400 700'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-neutral-900 text-white text-base">
      <head>
        <title>Frontend Mentor | Typing Speed Test</title>
      </head>
      <body className={sora.className}>{children}</body>
    </html>
  );
}
