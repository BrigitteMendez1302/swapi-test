import { APIGatewayEvent, Context } from "aws-lambda";
import { PeopleService } from "../../application/PeopleService";
import { PeopleRepository } from "../repositories/PeopleRepository";
import { TranslationUtils } from "../../../shared/utils/TranslationUtils";
import { ResponseHandler, ResponseError } from "../../../shared/utils/ResponseHandler";

const peopleRepository = new PeopleRepository();
const peopleService = new PeopleService(peopleRepository, new TranslationUtils());

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      throw new ResponseError(400, "The 'id' parameter is required.");
    }

    const person = await peopleService.getPerson(id);

    return ResponseHandler.success(person, "Person retrieved successfully");
  } catch (error) {
    return ResponseHandler.error(error);
  }
};
