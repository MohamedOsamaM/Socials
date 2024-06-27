'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/page";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Footer from "./_components/footer/page";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Socials</title>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <body className={inter.className}>
              <Navbar></Navbar>
              <div className="mb-[150px]">
                {children}
              </div>
              <Footer></Footer>
            </body>
          </Provider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
