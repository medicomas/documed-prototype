import { FieldValues, useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useApi";
import { Patient } from "../../types";
import { useState } from "react";
import { medifetch } from "../../services/medifetch";

enum ButtonStatus {
  IDLE = 'Editar',
  LOADING = 'Guardando...',
  SUCCESS = 'Editado! 🐢',
  ERROR = 'Error 😿'
}

function PatientInformationForm({ id }: { id: string }) {
  const { data, error, isLoading, mutate } = useFetch(`/patient/${id}`);
  const [buttonStatus, setButtonStatus] = useState(ButtonStatus.IDLE);
  const { register, handleSubmit } = useForm();

  const patient = data as Patient | undefined;

  const onSubmit = async (data: FieldValues) => {
    setButtonStatus(ButtonStatus.LOADING);
    try {
      const response = await medifetch(`/patient/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const newUser = await response.json() as Patient;
      mutate(newUser, {
        revalidate: false
      });
    }
    catch (e) {
      setButtonStatus(ButtonStatus.ERROR);
      setTimeout(() => setButtonStatus(ButtonStatus.IDLE), 2000);
    }
    finally {
      setButtonStatus(ButtonStatus.SUCCESS);
      setTimeout(() => setButtonStatus(ButtonStatus.IDLE), 2000);
    }
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
          disabled={buttonStatus === ButtonStatus.LOADING}
          className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs py-2 px-4 rounded inline-flex items-center"
        >
          {buttonStatus}
        </button>
      </section>
    </form>
  );
}

export default PatientInformationForm;
