import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__logo-icon" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span />
        </div>
        <h1 className="header__title">
          Barcode<span>Vault</span>
        </h1>
      </div>
      <div className="header__badge">v1.0 · PT-BR</div>
    </header>
  );
}