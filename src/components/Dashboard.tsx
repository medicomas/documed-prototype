import { Link } from "wouter";

function Dashboard() {

  return (
    <main className="p-6">
      <h1 className="text-xl mb-4">Dashboard</h1>
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
