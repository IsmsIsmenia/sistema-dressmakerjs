import { Link, useLocation } from "react-router-dom";

export default function SidebarMenuDesktop() {
  const location = useLocation();

  const links = [
    { to: "/homemobile", label: "🏠 Home" },
    { to: "/pedidos", label: "📋 Pedidos" },
    { to: "/adminmobile", label: "⚙️ Administração" },
    { to: "/estoque", label: "🧵 Estoque" },
    { to: "/agenda", label: "📅 Agenda" },
  ];

  return (
    <nav className="flex flex-col space-y-3">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`text-white px-4 py-2 rounded-md text-md font-medium no-underline transition ${
            location.pathname === link.to
              ? "bg-[#849573]"
              : "hover:bg-[#6c8660]"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
