const Header = ({ leftChild, headText, rightChild }) => {
  return (
    <header>
      <div className="header-left">{leftChild}</div>
      <h1 className="header-text">{headText}</h1>
      <div className="header-right">{rightChild}</div>
    </header>
  );
};

export default Header;
