// app/sessions.js
import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or "@remix-run/cloudflare"

export const COOKIE_SECRET = process.env.SECRETS || "c-secret";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__mysession",

      // all of these are optional
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 60,
      path: "/",
      sameSite: "lax",
      secrets: [COOKIE_SECRET],
      secure: process.env.NODE_ENV === "production"
    }
  });

export { getSession, commitSession, destroySession };

// Create user session
export async function createUserSession(redirectTo: string, token: any) {
  const session = await getSession();
  session.set("access_token", token);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
}

// Get user session
export function getUserSession(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

// Logout user and destroy session
export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/logout/confirm", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
}
