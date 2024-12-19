import { v4 as uuidv4 } from "uuid";
import { IVehicleRepository } from "../domain/repositories/IVehicleRepository";
import { Vehicle } from "../domain/entities/Vehicle";

export class VehicleService {
  private vehicleRepository: IVehicleRepository;

  constructor(vehicleRepository: IVehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async createVehicle(vehicle: Omit<Vehicle, "id" | "created_at">): Promise<Vehicle> {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };

    await this.vehicleRepository.save(newVehicle);

    return newVehicle;
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    return await this.vehicleRepository.getAll();
  }
}
