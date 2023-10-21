
function ProtectedRoute({ children }: { children: React.ReactNode }) {

  if (localStorage.getItem('meditoken') === null) {
    window.location.href = '/login';
  }

  return (
    <>{children}</>
  );
}

export default ProtectedRoute;
