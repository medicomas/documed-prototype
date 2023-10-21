import { Link } from "wouter";

function Dashboard() {

  return (
    <main>
      <h1 className="text-xl mb-4 mt-5">Dashboard</h1>
      <Link
        to="/pacientes"
        className="bg-slate-200 hover:bg-slate-300 text-black text-sm py-2 px-4 rounded border border-black"
      >
        Pacientes
      </Link>
    </main>
  );
}

export default Dashboard;
