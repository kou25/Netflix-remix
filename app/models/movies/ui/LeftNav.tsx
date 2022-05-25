import React, { Fragment } from "react";
import { NavLink } from "@remix-run/react";
import type { IconType } from "react-icons";

import {
  AiFillCompass,
  AiOutlineCompass,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineCalendar,
  AiFillCalendar
} from "react-icons/ai";
import { FaRegUser, FaUser } from "react-icons/fa";
import { HiUsers, HiOutlineUsers } from "react-icons/hi";
import { IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxRFill, RiLogoutBoxRLine } from "react-icons/ri";

const navigation = [
  {
    name: "Browse",
    href: "/admin/movies",
    icon: AiOutlineCompass,
    activeIcon: AiFillCompass,
    disabled: false
  },
  {
    name: "Watchlist",
    href: "/admin/services",
    icon: AiOutlineHeart,
    activeIcon: AiFillHeart,
    disabled: true
  },
  {
    name: "Coming soon",
    href: "/admin/sessions",
    icon: AiOutlineCalendar,
    activeIcon: AiFillCalendar,
    disabled: true
  }
];

const socialNavigation = [
  {
    name: "Friends",
    href: "/admin/friends",
    icon: FaRegUser,
    activeIcon: FaUser,
    disabled: true
  },
  {
    name: "Parties",
    href: "/admin/parties",
    icon: HiOutlineUsers,
    activeIcon: HiUsers,
    disabled: true
  }
];

const generalNavigation = [
  {
    name: "Setttings",
    href: "/admin/settings",
    icon: IoSettingsOutline,
    activeIcon: IoSettingsSharp,
    disabled: true
  },
  {
    name: "Log out",
    href: "/logout",
    icon: RiLogoutBoxRLine,
    activeIcon: RiLogoutBoxRFill,
    disabled: false
  }
];
export const LeftNav = () => {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-slate-50 border-r border-stone-300">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <NavLink to="/admin/movies">
            <div className="flex flex-shrink-0 items-center px-8 py-6">
              <p className="text-2xl font-bold  tracking-wide text-gray-700">
                Netflix
              </p>
              <span className="text-2xl font-bold  tracking-wide text-red-500 ">
                .
              </span>
            </div>
          </NavLink>
          <div className="px-8">
            <span className="text-gray-400">Menu</span>
          </div>
          <nav className="mt-5 flex-1 space-y-1 bg-slate-50">
            {navigation.map((item) => NavLinkContainer(item))}
          </nav>
          <div className="px-8">
            <span className="text-gray-400">Social</span>
          </div>
          <nav className="mt-5 flex-1 space-y-1 bg-slate-50">
            {socialNavigation.map((item) => NavLinkContainer(item))}
          </nav>
          <div className="px-8">
            <span className="text-gray-400">General</span>
          </div>
          <nav className="mt-5 flex-1 space-y-1 bg-slate-50">
            {generalNavigation.map((item) => NavLinkContainer(item))}
          </nav>
          <span className="mt-5 px-8 space-y-1 text-gray-400 font-jennaSue">
            Code by Koustav
          </span>
        </div>
      </div>
    </div>
  );
};

const NavLinkContainer = (item: {
  name: string;
  href: string;
  icon: IconType;
  activeIcon: IconType;
  disabled: boolean;
}) => {
  return (
    <NavLink
      key={item.name}
      to={item.href}
      className={({ isActive }) =>
        ` group relative mx-6 flex items-center rounded-md px-4 py-3 text-sm font-medium ${
          isActive
            ? "bg-red-50 text-gray-900"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        } ${item.disabled && "pointer-events-none"}`
      }
    >
      {({ isActive }) => (
        <Fragment>
          {isActive ? (
            <div className="absolute left-0 top-2 bottom-2 -ml-6 w-1 bg-red-500" />
          ) : null}
          {isActive ? (
            <item.activeIcon
              className={`mr-3 h-6 w-6 flex-shrink-0 ${
                isActive
                  ? "text-red-500"
                  : "text-red-400 group-hover:text-red-500"
              }`}
              aria-hidden="true"
            />
          ) : (
            <item.icon
              className={`mr-3 h-6 w-6 flex-shrink-0 ${
                isActive
                  ? "text-gray-500"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
              aria-hidden="true"
            />
          )}
          <span
            className={`${
              isActive ? "text-gray-600 font-semibold" : "text-gray-400"
            }`}
          >
            {item.name}
          </span>
        </Fragment>
      )}
    </NavLink>
  );
};
