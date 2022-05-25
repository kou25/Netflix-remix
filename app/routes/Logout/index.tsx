import { Form } from "@remix-run/react";
import React from "react";
import { LeftNav } from "~/models/movies/ui/LeftNav";
import RightNav from "~/models/movies/ui/RightNav";

const Logout = () => {
  return (
    <div className="flex flex-row">
      <LeftNav />
      <div className="flex justify-center flex-col items-center m-auto p-auto h-screen">
        <h2 className="text-3xl font-semibold">
          Are you sure you want to logout ?
        </h2>
        <Form action="/logout/confirm" method="post">
          <button className="px-5 py-2 bg-red-500 shadow-md text-white rounded-md hover:bg-white hover:text-red-500 mt-5">
            Confirm
          </button>
        </Form>
      </div>

      <RightNav />
    </div>
  );
};

export default Logout;
