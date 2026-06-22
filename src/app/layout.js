import "./globals.css";

export const metadata = {
  title: "EasyGo | Premium AI Travel Advisor & Planner",
  description: "Your stress-free travel advisor and itinerary optimizer. Save time, save money, and eliminate uncertainty.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
