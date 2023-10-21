import PatientInformationForm from "./PatientInformationForm";

function PatientDetail({ id }: { id: string }) {

  return (
    <main>
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
