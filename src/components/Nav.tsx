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
    <nav className="w-full mb-2 font-bold py-4 flex justify-between">
      <div className="text-2xl">
        <NavLink to="/">
          <h2 className="text-primary">Hacker News</h2>
        </NavLink>
      </div>
      <ul className="flex items-center gap-2">
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

        <li>
          <a
            href="https://github.com/qzda/hacker-news-web"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-button"
          >
            <i className="i-carbon:logo-github" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
