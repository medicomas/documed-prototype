import { Link } from "wouter";
import { useAPIUrl } from "../state";

function Header() {
  const { url, setUrl } = useAPIUrl();

  return (
    <header id="main-header" className="flex items-center bg-slate-400">
      <Link to="/">
        <div className="border-black border m-2 cursor-pointer">
          <img
            className="w-12"
            src="https://avatars.githubusercontent.com/u/143916992?s=200&v=4"
          />
        </div>
      </Link>
      <div>
        <span className="text-white text-sm mr-2">API</span>
        <input
          className="border p-2 text-xs w-64 border-black h-6"
          placeholder="http://api.medicomas.com"
          value={url}
          onInput={(e) => {
            console.log(e)
            setUrl((e.target as HTMLInputElement).value);
          }}
        >
        </input>
      </div>
    </header>
  );
}

export default Header;
