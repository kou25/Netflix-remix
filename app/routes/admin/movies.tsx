import { Outlet } from "@remix-run/react";

import { LeftNav } from "~/models/movies/ui/LeftNav";
import RightNav from "~/models/movies/ui/RightNav";

const Movies = () => {
  return (
    <div className="flex flex-row">
      <LeftNav />
      <div className="flex flex-1 flex-col md:pl-64 md:pr-16 bg-slate-50 min-h-screen w-[calc(100%_-_320px)]">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <RightNav />
    </div>
  );
};

export default Movies;
// prevent loader from firing whenever there is a route change from child routes
// https://remix.run/docs/en/v1/api/conventions#ignoring-search-params
export const unstable_shouldReload = () => false;
