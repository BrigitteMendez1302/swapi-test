import { handler } from "../src/vehicles/infrastructure/controllers/GetVehiclesController";
import { VehicleService } from "../src/vehicles/application/VehicleService";
import { ResponseError } from "../src/shared/utils/ResponseHandler";

describe("GetAllVehiclesController - handler", () => {
  let spyGetAllVehicles: jest.SpyInstance;

  beforeEach(() => {
    spyGetAllVehicles = jest.spyOn(VehicleService.prototype, "getAllVehicles");
  });

  afterEach(() => {
    jest.clearAllMocks();
    spyGetAllVehicles.mockRestore();
  });

  it("should return 200 and a list of vehicles when vehicles are available", async () => {
    const mockVehicles = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        vehicle_class: "wheeled",
        model: "Sand Crawler",
        name: "Tatooine Transport",
        passengers: "30",
        cost_in_credits: "150000",
        crew: "46",
        created_at: "2023-12-01T00:00:00.000Z",
      },
    ];

    spyGetAllVehicles.mockResolvedValue(mockVehicles);

    const response = await handler();

    expect(response.statusCode).toBe(200);

    expect(JSON.parse(response.body)).toEqual({
      message: "Vehicles fetched successfully.",
      data: mockVehicles,
    });

    expect(spyGetAllVehicles).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if an unexpected error occurs", async () => {
    spyGetAllVehicles.mockRejectedValue(new ResponseError(500, "Unexpected error"));

    const response = await handler();

    expect(response.statusCode).toBe(500);

    expect(JSON.parse(response.body)).toEqual({
      message: "Unexpected error",
      details: null,
    });

    expect(spyGetAllVehicles).toHaveBeenCalledTimes(1);
  });
});
