import { mutate } from "swr";
import { useToken } from "../../store";

function UserView() {
  const setToken = useToken(s => s.setToken);

  return (
    <div>
      <button
        className="p-2 rounded-md bg-slate-500 h-8 text-xs text-white"
        onClick={() => {
          setToken('');
          mutate('/auth/user');
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default UserView;
