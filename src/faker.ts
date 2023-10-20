import { faker } from "@faker-js/faker";

export const randomPatient = () => {
  return {
    id: faker.number.int(20),
    names: faker.person.firstName(),
    surnames: faker.person.lastName(),
    documentType: "DNI",
    document: faker.string.numeric(8),
    gender: ["M", "F"][faker.number.int({ min: 0, max: 1 })],
  }
}
