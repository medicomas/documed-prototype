import { useToken } from "../../store";
import { useUser } from "../../hooks/useUser";

function UserView() {
  const setToken = useToken(s => s.setToken);
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex items-center">
      <div>
        <span className="text-sm mr-4">{user.names}</span>
      </div>
      <button
        className="p-2 rounded-md bg-slate-500 h-8 text-xs text-white"
        onClick={() => setToken('')}
      >
        Logout
      </button>
    </div>
  );
}

export default UserView;
