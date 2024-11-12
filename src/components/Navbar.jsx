import { FaUser, SiJfrogpipelines } from "./../icons/index.js";
import logo from "./../assets/logo.jpg";
const NavBar = () => {
  return (
    <>
      <nav className="flex items-center gap-x-14 bg-white">
        <div className="">
          <img className="h-16" src={logo} alt="logo" />
        </div>
        <div className="flex gap-x-4">
          <SiJfrogpipelines className="text-mint" />
          <FaUser className="text-mint" />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
