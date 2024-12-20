import { IPeopleRepository } from "../domain/repositories/IPeopleRepository";
import { TranslationUtils } from "../../shared/utils/TranslationUtils";

export class PeopleService {
  constructor(
    private readonly peopleRepository: IPeopleRepository,
  ) {}

  async getPerson(id: string): Promise<any> {
    const data = await this.peopleRepository.getPersonById(id);
    
    const translatedData = await TranslationUtils.translateKeys(data);

    return translatedData;
  }
}
