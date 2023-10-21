import { useFetch } from './useApi';

type UserRole = "ADMIN" | "DOCTOR";

interface LoggedUserInformation {
  email: string,
  names: string,
  surnames: string,
  roles: UserRole[]
}

export function useUser(): { loading: boolean, user: null | LoggedUserInformation } {
  const { data, error, isLoading } = useFetch('/auth/user');

  if (isLoading) return { loading: true, user: null };
  if (error) return { loading: false, user: null };
  if (!data) return { loading: false, user: null };

  return {
    loading: false,
    user: data as LoggedUserInformation
  }

  // return ({
  //   email: "damaris@medicomas.com",
  //   names: "Dr. Damaris Marian",
  //   surnames: "Del Carpio Martinez",
  //   roles: ["ADMIN"]
  // } satisfies LoggedUserInformation);
}
