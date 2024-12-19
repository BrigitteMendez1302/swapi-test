import { Person } from "../entities/Person";

export interface IPeopleRepository {
    getPersonById(id: string): Promise<Person>;
  }
  