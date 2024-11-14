import { FaUser, SiJfrogpipelines } from "./../icons/index.js";
import logo from "./../assets/logo.jpg";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-md md:p-6 lg:px-10">
      <div className="h-10 md:h-16">
        <img className="h-full" src={logo} alt="logo" />
      </div>

      <div className="flex items-center gap-x-4 text-sm md:text-base lg:text-base">
        <div className="text-mint">
          <span className="block md:hidden">
            <SiJfrogpipelines className="text-lg sm:text-xl md:text-2xl" />
          </span>
          <span className="hidden md:block">General-Pipeline</span>
        </div>
        <div className="text-mint">
          <span className="block md:hidden">
            <FaUser className="text-lg sm:text-xl md:text-2xl" />
          </span>
          <span className="hidden md:block">User</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
