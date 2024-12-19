import { APIGatewayEvent } from "aws-lambda";
import { VehicleService } from "../../application/VehicleService";
import { VehicleRepository } from "../repositories/VehicleRepository";
import { ResponseHandler, ResponseError } from "../../../shared/utils/ResponseHandler";

const repository = new VehicleRepository();
const vehicleService = new VehicleService(repository);

export const handler = async (event: APIGatewayEvent) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const { vehicle_class, model, name, passengers, cost_in_credits, crew } = body;

    if (!vehicle_class || !model || !name || !passengers || !cost_in_credits || !crew) {
      return new ResponseError(400, "All fields are required");
    }

    const vehicle = await vehicleService.createVehicle({
      vehicle_class,
      model,
      name,
      passengers,
      cost_in_credits,
      crew,
    });

    return ResponseHandler.success(vehicle, "Vehicle created successfully.");
  } catch (error) {
    return ResponseHandler.error(error);
  }
};
