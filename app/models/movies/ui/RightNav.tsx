import React from "react";
import { faker } from "@faker-js/faker";
import Avatar from "react-avatar";

const generateAvatars = () => faker.image.avatar();

const RightNav = () => {
  return (
    <div className="hidden md:fixed md:top-0 md:right-0 md:bottom-0  md:w-16 md:flex md:flex-col bg-white">
      <div className="flex min-h-0 flex-1 flex-col bg-white justify-center items-center">
        <div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
            <span className="font-medium leading-none text-white">+</span>
          </span>
        </div>
        {[...Array(6)].map((x, i) => (
          <div className="py-2" key={i}>
            <Avatar size="40" src={generateAvatars()} round />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightNav;
