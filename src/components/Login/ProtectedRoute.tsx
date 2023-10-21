import { useLocation } from "wouter";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();

  if (localStorage.getItem('meditoken') === null) {
    window.location.href = '/login';
  }

  return (
    <>{children}</>
  );
}

export default ProtectedRoute;
