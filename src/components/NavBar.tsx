import { ActiveLink } from "raviger";

interface NavBarProps {
    name: string;
    path: string;
}

export const NavBar = (props: {navLinks: NavBarProps[]}) => {
    return (
        <nav className="py-2 flex flex-row space-x-5">
            <span>Navigate</span>
          <ul className="flex justify-center space-x-5">
            {props.navLinks.map((item) => (
              <li key={item.path}>
                <ActiveLink className="bg-blue-100 px-2 py-1 rounded-lg hover:underline" exactActiveClass="bg-blue-500 text-blue-50" href={item.path}>
                  {item.name}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </nav>
    );
};