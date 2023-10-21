import { Redirect } from "wouter";
import { useUser } from "../../hooks/useUser";

function WithSession({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Redirect to="/login" />;

  return children;
}

export default WithSession;
