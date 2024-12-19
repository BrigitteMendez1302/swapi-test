import { Vehicle } from "../entities/Vehicle";

export interface IVehicleRepository {
  save(vehicle: Vehicle): Promise<void>;
  getAll(): Promise<Vehicle[]>;
}
