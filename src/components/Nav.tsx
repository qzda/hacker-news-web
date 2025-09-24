import { NavLink, type NavLinkRenderProps } from "react-router";

function activeStyle(props: NavLinkRenderProps) {
  const { isActive } = props;

  const classNames = ["link text-gray-400"];

  if (isActive) {
    classNames.push("text-black! dark:text-white!");
  }

  return classNames.join(" ");
}

export default function Nav() {
  const navItems: { name: string; to: string }[] = [
    // { name: "ask", to: "/ask" }
  ];

  return (
    <nav className="w-full mb-4 text-2xl font-bold py-4 flex justify-between">
      <div>
        <NavLink to="/">
          <h2 className="text-#ff6600">Hacker News</h2>
        </NavLink>
      </div>
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
