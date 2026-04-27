import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { WHATSAPP } from "../../constants/site";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About Us" },
    { to: "/service", label: "Service" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-wide text-primary">
          <img src={logo} alt="Ruang Bangun" className="h-auto w-24" />
        </Link>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)}>
          <Menu />
        </button>
        <nav
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col bg-white p-4 md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:bg-transparent md:p-0`}
        >
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="py-2 text-md font-medium hover:text-secondary"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-primary px-4 py-2 text-sm text-white"
          >
            Konsultasi
          </a>
        </nav>
      </div>
    </header>
  );
}
