import { NavLink, type NavLinkRenderProps } from "react-router";

function activeStyle(props: NavLinkRenderProps) {
  const { isActive } = props;
  if (isActive) return "text-#ff6600";

  // return "text-gray";
}

export default function Nav() {
  const navItems = [
    { name: "Hacker News", to: "/" },
    { name: "new", to: "/new" },
    { name: "past", to: "/past" },
    { name: "comment", to: "/comment" },
    { name: "ask", to: "/ask" },
  ];

  return (
    <nav className="w-full mb-8 text-lg font-bold">
      <ul className="flex gap-2">
        {navItems.map((item) => {
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={activeStyle}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
