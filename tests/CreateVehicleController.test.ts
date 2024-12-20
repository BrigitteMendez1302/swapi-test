import { handler } from "../src/vehicles/infrastructure/controllers/CreateVehicleController";
import { VehicleService } from "../src/vehicles/application/VehicleService";
import { APIGatewayEvent } from "aws-lambda";
import { ResponseError } from "../src/shared/utils/ResponseHandler";

describe("CreateVehicleController", () => {
  let createVehicleSpy: jest.SpyInstance;

  beforeEach(() => {
    createVehicleSpy = jest.spyOn(VehicleService.prototype, "createVehicle");
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should return 200 and create a vehicle when all fields are provided", async () => {
    const mockVehicle = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      vehicle_class: "wheeled",
      model: "Sand Crawler",
      name: "Tatooine Transport",
      passengers: "30",
      cost_in_credits: "150000",
      crew: "46",
      created_at: "2023-12-01T00:00:00.000Z",
    };

    createVehicleSpy.mockResolvedValue(mockVehicle);

    const event = {
      body: JSON.stringify({
        vehicle_class: "wheeled",
        model: "Sand Crawler",
        name: "Tatooine Transport",
        passengers: "30",
        cost_in_credits: "150000",
        crew: "46",
      }),
    } as unknown as APIGatewayEvent;

    const response = await handler(event);

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      message: "Vehicle created successfully.",
      data: mockVehicle,
    });

    expect(createVehicleSpy).toHaveBeenCalledWith({
      vehicle_class: "wheeled",
      model: "Sand Crawler",
      name: "Tatooine Transport",
      passengers: "30",
      cost_in_credits: "150000",
      crew: "46",
    });
  });

  it("should return 400 if any required field is missing", async () => {
    const event = {
      body: JSON.stringify({
        vehicle_class: "wheeled",
        model: "Sand Crawler",
        name: "Tatooine Transport",
        passengers: "30",
        cost_in_credits: "150000",
      }),
    } as unknown as APIGatewayEvent;

    const response = await handler(event);

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      message: "All fields are required",
      details: null,
    });

    expect(createVehicleSpy).not.toHaveBeenCalled();
  });

  it("should return 500 if an unexpected error occurs", async () => {
    const event = {
      body: JSON.stringify({
        vehicle_class: "wheeled",
        model: "Sand Crawler",
        name: "Tatooine Transport",
        passengers: "30",
        cost_in_credits: "150000",
        crew: "46",
      }),
    } as unknown as APIGatewayEvent;

    createVehicleSpy.mockRejectedValue(new ResponseError(500, "Unexpected error"));

    const response = await handler(event);

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({
      message: "Unexpected error",
      details: null,
    });
  });
});
