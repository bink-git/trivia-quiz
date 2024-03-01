import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="flex items-center justify-center">
      <img src={logo} alt="logo" className="w-40 m-10" />
    </header>
  );
};

export default Header;
