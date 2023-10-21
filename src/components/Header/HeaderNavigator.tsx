import { Link, useLocation } from "wouter";

function HeaderNavigator() {
  const [location] = useLocation();
  const splitedLocation = (location === "/" ? "" : location).split("/");
  splitedLocation.splice(0, 1, "home");

  return (
    <header id="navigator-header" className="flex items-center bg-slate-100">
      <div className="py-1">
        {
          splitedLocation.map((path, index) => {
            let to = location.split("/").slice(0, index + 1).join("/");
            if (to === "" && index === 0) {
              to = "/";
            }
            return (
              <Link
                key={index}
                to={to}
              >
                {"/ "}<span
                  className="cursor-pointer text-black text-sm mr-1 bg-slate-200 px-2 rounded"
                >
                  {path}
                </span>
              </Link>
            );
          })
        }
      </div>
    </header>
  );
}

export default HeaderNavigator;
