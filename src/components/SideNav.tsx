import { PiSignOutBold } from "react-icons/pi";
// import { signOut } from "@/auth";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import UpcomingEvents from "./common/RightNav/UpcomingEvents";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md  p-4"
        to="/"
      >
        <div className="w-32 text-white md:w-40">
          {/* <img
            src={logo}
            alt="Picture of the author"
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          /> */}
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div>
          <div className="max-md:hidden">
            <UpcomingEvents />
          </div>
          <form
          // action={async () => {
          //   // await signOut();
          // }}
          >
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-accentColor md:flex-none md:justify-start md:p-2 md:px-3">
              <PiSignOutBold className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
