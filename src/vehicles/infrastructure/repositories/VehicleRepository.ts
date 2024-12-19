import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { IVehicleRepository } from "../../domain/repositories/IVehicleRepository";
import { Vehicle } from "../../domain/entities/Vehicle";

export class VehicleRepository implements IVehicleRepository {
  private dynamoDbClient: DynamoDBClient;
  private tableName: string;

  constructor() {
    this.dynamoDbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
    this.tableName = process.env.VEHICLE_TABLE_NAME || "Vehicles";
  }

  async save(vehicle: Vehicle): Promise<void> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: vehicle,
    });
    await this.dynamoDbClient.send(command);
  }

  async getAll(): Promise<Vehicle[]> {
    const command = new ScanCommand({ TableName: this.tableName });

    try {
      const response = await this.dynamoDbClient.send(command);
      return (response.Items || []) as Vehicle[];
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      throw new Error("Error fetching vehicles");
    }
  }
}
