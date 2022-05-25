import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition
} from "@remix-run/react";
import React from "react";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import tailwindUrl from "./styles/tailwind.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix-Netflix",
  viewport: "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1"
});

export const links = () => [
  { rel: "stylesheet", href: tailwindUrl },
  { rel: "stylesheet", href: nProgressStyles }
];

export default function App() {
  const transition = useTransition();

  React.useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === "idle") NProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else NProgress.start();
  }, [transition.state]);

  return (
    <Document>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </Document>
  );
}

function Document({ children }: any) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}

export function ErrorBoundary({ error }: any) {
  return (
    <Document>
      <h1>Error</h1>
      <p>{error.message}</p>
    </Document>
  );
}
