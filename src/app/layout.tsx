// src/app/layout.tsx
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className="font-noto-thai">
        {children}
      </body>
    </html>
  )
}
