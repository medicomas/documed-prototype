
/**
model Patient {
  id           Int            @id @default(autoincrement())
  names        String
  surnames     String
  documentType String
  document     String         @unique
  gender       String         @db.Char(1)
  Appointments Appointments[]
  Diagnose     Diagnose[]
}
 */
export type Patient = {
  id: number;
  names: string;
  surnames: string;
  documentType: string;
  document: string;
  gender: "M" | "F";
}

export type UserRole = "ADMIN" | "DOCTOR";

export interface LoggedUserInformation {
  email: string,
  names: string,
  surnames: string,
  roles: UserRole[]
}
