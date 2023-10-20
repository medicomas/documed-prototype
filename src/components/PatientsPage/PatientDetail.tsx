import { Link } from "wouter";
import PatientInformationForm from "./PatientInformationForm";

function PatientDetail({ id }: { id: string }) {

  return (
    <main className="p-6">
      <Link to="/pacientes">
        <button className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs py-2 px-4 rounded inline-flex items-center">
          {"⬅️"} Volver
        </button>
      </Link>
      <article>
        {
          <section className="mt-4">
            <PatientInformationForm id={id} />
          </section>
        }
      </article>
    </main>
  );
}

export default PatientDetail;
