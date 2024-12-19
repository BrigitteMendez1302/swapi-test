import { IPeopleRepository } from "../domain/repositories/IPeopleRepository";
import { TranslationUtils } from "../../shared/utils/TranslationUtils";

export class PeopleService {
  constructor(
    private readonly peopleRepository: IPeopleRepository,
    private readonly translator: TranslationUtils
  ) {}

  async getPerson(id: string): Promise<any> {
    const data = await this.peopleRepository.getPersonById(id);

    const translatedData = await this.translator.translateKeys(data);

    return translatedData;
  }
}
