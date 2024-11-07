"use client";
import { FaHome } from "react-icons/fa";
import { MdAppRegistration } from "react-icons/md";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  // { name: "Dashboard", href: "/dashboard", icon: FaHome },
  {
    name: "Planning",
    href: "/dashboard/plan",
    icon: MdAppRegistration,
  },
];

export default function NavLinks() {
  let location = useLocation();

  console.log("payh: ", location.pathname);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-accentColor md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-black": location.pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
