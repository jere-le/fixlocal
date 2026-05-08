export const metadata = {
  title: "FixLocal",
  description: "Phone repair management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#fff" }}>
        {children}
      </body>
    </html>
  );
}
