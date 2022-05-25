import { redirect } from "@remix-run/node";
import { logout } from "~/sessions";

export const action = async ({ request }: any) => {
  return logout(request);
};

export const loader = async ({ request }: any) => {
  return redirect("/");
};
