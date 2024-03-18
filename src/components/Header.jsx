import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="flex items-center justify-center">
      <img src={logo} alt="trivia quiz logo" className="mb-10 w-40" />
    </header>
  );
};

export default Header;
