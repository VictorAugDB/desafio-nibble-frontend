import { useRouter } from "next/router";
import React from "react";
import { Header } from "../components/Header";
import { AuthProvider } from "../hooks/auth";
import { ManageClientsProvider } from "../hooks/manageClients";
import { GlobalStyle } from "../styles/GlobalStyle";

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter()
  const isOnLoginPage = pathname !== '/'

  return (
    <AuthProvider>
      <ManageClientsProvider>
        <GlobalStyle />
        {isOnLoginPage && <Header />}
        <Component {...pageProps} />
      </ManageClientsProvider>
    </AuthProvider>
  )
}

export default MyApp
