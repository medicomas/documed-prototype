import { Link } from "wouter";
import HeaderNavigator from "./HeaderNavigator";
import UserView from "./UserView";
import { useAPIUrl } from "../../store";

function Header() {
  const { url, setUrl } = useAPIUrl();

  return (
    <>
      <header id="main-header" className="flex justify-between bg-slate-400 pl-6">
        <div className="flex items-center">
          <Link to="/">
            <div className="border-black border mr-2 cursor-pointer">
              <img
                className="w-12 h-12"
                src="https://avatars.githubusercontent.com/u/143916992?s=200&v=4"
              />
            </div>
          </Link>
          <div>
            <span className="text-white text-sm mr-2">API</span>
            <input
              className="border p-2 text-xs w-36 border-black h-6"
              placeholder="http://api.medicomas.com"
              value={url}
              onInput={(e) => {
                setUrl((e.target as HTMLInputElement).value);
              }}
            >
            </input>
          </div>
        </div>
        <div className="flex items-center">
          <UserView />
        </div>
      </header>
      <HeaderNavigator />
    </>
  );
}

export default Header;
