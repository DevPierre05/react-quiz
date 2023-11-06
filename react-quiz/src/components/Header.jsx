import logo from "../assets/logo.png"
function Header() {
  return (
    <header className="flex gap-5 h-auto mb-20 sm:gap-10">
      <img
        src={logo}
        className="w-[30px] sm:w-[40px] md:w-[50px] lg:w-[100px]"
        alt="React logo"
      />
      <h1 className="text-[2.4rem] sm:text-[3.6rem] md:text-[4rem] lg:text-[6rem] uppercase">
        The React Quiz
      </h1>
    </header>
  );
}

export default Header;
