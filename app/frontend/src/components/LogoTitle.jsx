import logo from "../assets/sipcha-logo-text-right.webp";

export const LogoTitle = ({ collapsed }) => {
  return (
    <div className="brand-logo">
      <img
        src={logo}
        alt="sipcha.io"
        style={{ height: collapsed ? 28 : 34, width: "auto" }}
      />
    </div>
  );
};
