import axios from "axios";
import { IPeopleRepository } from "../../domain/repositories/IPeopleRepository";
import { Person } from "../../domain/entities/Person";

export class PeopleRepository implements IPeopleRepository {
  private readonly SWAPI_BASE_URL = "https://swapi.py4e.com/api/people";

  async getPersonById(id: string): Promise<Person> {
    try {
      const url = `${this.SWAPI_BASE_URL}/${id}/`;
      const response = await axios.get(url);
  
      return response.data as Person;
    } catch (error) {
      console.error(`Error fetching person with ID ${id}:`, error);
      throw new Error("Could not fetch person data");
    }
  }
  
}
