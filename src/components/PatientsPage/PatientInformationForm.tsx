import { FieldValues, useForm } from "react-hook-form";
import { useApi } from "../../hooks/useApi";
import { useAPIUrl } from "../../state";
import { Patient } from "../../types";
import { useState } from "react";

function PatientInformationForm({ id }: { id: string }) {
  const { data, error, isLoading, mutate } = useApi(`/patient/${id}`);
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm();

  const patient = data as Patient | undefined;

  const onSubmit = (data: FieldValues) => {
    const { medifetch } = useAPIUrl.getState();

    setIsEditing(true);
    medifetch(`/patient/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => {
      mutate(data);
      setIsEditing(false);
    })
  }

  return (
    isLoading ? <div>Loading...</div> :
    error ? <div>Error</div> :
    !patient ? <div>No data</div> :
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <input {...register("names", { value: patient.names })} className="text-2xl font-bold" placeholder="Nombres" />
      <input {...register("surnames", { value: patient.surnames })} placeholder="Apellidos" />
      <section className="mt-4">
        <select {...register("gender", { value: patient.gender, required: true })}>
          <option value="">Select...</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </section>
      <section className="flex mt-4">
        <select {...register("documentType", { value: patient.documentType, required: true })}>
          <option value="">Select...</option>
          <option value="DNI">DNI</option>
          <option value="CARNE">Carné universitario</option>
          <option value="CE">Carné de extranjería</option>
          <option value="PA">Pasaporte</option>
        </select>
        <input className="ml-4" {...register("document", { value: patient.document })} placeholder="Documento" />
      </section>
      <section className="flex justify-end">
        <button
          type="submit"
          disabled={isEditing}
          className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs py-2 px-4 rounded inline-flex items-center"
        >
          {isEditing ? "Guardando... 👍" : "Editar"}
        </button>
      </section>
    </form>
  );
}

export default PatientInformationForm;
