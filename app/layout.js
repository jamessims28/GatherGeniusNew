import "./globals.css";

export const metadata = {
  title: "GatherGenius",
  description: "Ambient AI Operating System"
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
