"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../(store)";
import { Header } from "./header";
import { SessionProvider } from "next-auth/react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Header />
        {children}
      </Provider>
    </SessionProvider>
  );
}
