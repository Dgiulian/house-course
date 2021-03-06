import { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "src/auth/useAuth";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/apollo";

import "../styles/index.css";
export default function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo();
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>Home Sweet Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}
