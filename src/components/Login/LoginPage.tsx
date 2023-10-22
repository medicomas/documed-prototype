import { FieldValues, useForm } from "react-hook-form";
import { medifetch } from "../../services/medifetch";
import { Redirect } from "wouter";
import { useToken } from "../../store";
import LoadingPage from "../LoadingPage";
import { useUser } from "../../hooks/useUser";

function LoginPage() {
  const { loading, user } = useUser();
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const setToken = useToken(s => s.setToken);

  if (loading) return <LoadingPage />;
  if (user) return <Redirect to="/" />;

  const onSubmit = async (fields: FieldValues) => {
    const { email, password } = fields;
    try {
      const response = await medifetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      const { status, token } = await response.json();
      if (!token || status !== "success") {
        setError('login', { message: 'Correo o contraseña incorrectos' });
        return;
      }
      setToken(token);
    } catch (e) {
      setError('api', { message: '/auth/login didn\'t work' });
    }
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="border-black border-2">
        <img className="h-[144px] w-[144px]" src="https://avatars.githubusercontent.com/u/143916992?s=200&v=4" />
      </div>
      <h3 className="mt-4 text-slate-800">
        El sistema de consultorio médico al 70%
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center max-w-xl w-96 h-80 mt-4 bg-slate-50">
        <label className="flex flex-col mb-4 mt-10">
          Email:
          <input
            className="border border-black h-8 rounded pl-2 w-64"
            {...register("email", { required: { message: "Email requerido", value: true } })}
          />
        </label>
        <label className="flex flex-col mb-2">
          Password:
          <input
            className="border border-black h-8 rounded pl-2 w-64"
            {...register("password", { required: { message: "Contraseña requerida", value: true } })}
          />
        </label>
        <button
          className="mx-14 w-20 mt-6 bg-slate-300 hover:bg-slate-400 text-slate-900 text-sm py-2 px-4 rounded"
          type="submit"
        >
            Login
        </button>
        <div className="h-12 mt-4">
          {
            errors.email ?
              <span className="text-red-500">{errors.email.message as string}</span> :
            errors.password ?
              <span className="text-red-500">{errors.password.message as string}</span> :
            errors.api ?
              <span className="text-red-500">{errors.api.message as string}</span> :
            errors.login ?
              <span className="text-red-500">{errors.login.message as string}</span> :
              null
          }
        </div>
      </form>
    </main>
  );
}

export default LoginPage;
