import { redirect } from "@remix-run/node";
import { getUserSession } from "~/sessions";

// use loader to check for existing session, if found, send the user to the blogs site
export async function loader({ request }: any) {
  const session = await getUserSession(request);

  if (session.has("access_token")) {
    // Redirect to the blog page if they are already signed in.
    //   console.log('user has existing cookie')
    return redirect("/admin/movies");
  }

  return redirect("/login");
}

export default function Index() {
  return <></>;
}
