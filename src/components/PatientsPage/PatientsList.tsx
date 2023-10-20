import { Patient } from "../../types";
import { useApi } from "../../hooks/useApi";
import { Link } from "wouter";

function PatientsList() {
  // revalidate every time the component re-renders
  const { data, error, isLoading } = useApi('/patient');

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error</div>
  }
  if (!data) {
    return <div>No data</div>
  }

  return (
    <div>
      <h1 className="mb-4 text-lg">Pacientes medicomas</h1>
      <table className="flex flex-col">
        <tbody>
          {(data as Patient[]).map((patient) => (
            <Link to={`/pacientes/${patient.id}`} key={patient.id}>
              <tr className="block pb-2 odd:bg-slate-100 cursor-pointer">
                  <td className="text-left w-24 overflow-ellipsis overflow-hidden whitespace-nowrap">
                    <span className="text-sm">{patient.document}</span>
                  </td>
                  <td className="w-64 overflow-ellipsis overflow-hidden whitespace-nowrap">
                    <span className="text-sm">
                      {patient.names} {patient.surnames}
                    </span>
                  </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsList;
