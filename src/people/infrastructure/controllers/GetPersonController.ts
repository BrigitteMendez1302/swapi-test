import { APIGatewayEvent } from "aws-lambda";
import { PeopleService } from "../../application/PeopleService";
import { PeopleRepository } from "../repositories/PeopleRepository";
import { ResponseHandler, ResponseError } from "../../../shared/utils/ResponseHandler";

const peopleRepository = new PeopleRepository();
const peopleService = new PeopleService(peopleRepository);

export const handler = async (event: APIGatewayEvent) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return ResponseHandler.error(new ResponseError(400, "The 'id' parameter is required."));
    }

    const person = await peopleService.getPerson(id);
    
    return ResponseHandler.success(person, "Person retrieved successfully");
  } catch (error) {
    return ResponseHandler.error(error);
  }
};
