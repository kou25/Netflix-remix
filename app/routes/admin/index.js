import React from "react";
import { redirect } from "@remix-run/node";

export const loader = () => {
  return redirect("/admin/home");
};
const index = () => {
  return <></>;
};

export default index;
