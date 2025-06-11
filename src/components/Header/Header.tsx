import style from './Header.module.css';

const Header = () => {
  return (
    <header className={`${style.header} container`}>
      <h1>Entertainer</h1>
    </header>
  );
};

export default Header;
