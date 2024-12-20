import { VehicleService } from "../../application/VehicleService";
import { VehicleRepository } from "../repositories/VehicleRepository";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler";

const repository = new VehicleRepository();
const vehicleService = new VehicleService(repository);

export const handler = async () => {
  try {
    const vehicles = await vehicleService.getAllVehicles();

    return ResponseHandler.success(vehicles, "Vehicles fetched successfully.");
  } catch (error) {
    return ResponseHandler.error(error);
  }
};
