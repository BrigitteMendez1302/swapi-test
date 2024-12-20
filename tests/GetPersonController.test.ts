import { handler } from "../src/people/infrastructure/controllers/GetPersonController";
import { PeopleService } from "../src/people/application/PeopleService";
import { APIGatewayEvent } from "aws-lambda";

describe("GetPersonController", () => {
  let spyGetPerson: jest.SpyInstance;

  beforeEach(() => {
    spyGetPerson = jest.spyOn(PeopleService.prototype, "getPerson");
  });

  afterEach(() => {
    jest.clearAllMocks();
    spyGetPerson.mockRestore();
  });

  it("should return 200 and a person when a valid ID is provided", async () => {
    const mockPerson = {
      name: "Luke Skywalker",
      birth_year: "19BBY",
      gender: "male",
    };

    spyGetPerson.mockResolvedValue(mockPerson);

    const event = {
      pathParameters: { id: "1" },
    } as unknown as APIGatewayEvent;

    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      message: "Person retrieved successfully",
      data: mockPerson,
    });
    expect(spyGetPerson).toHaveBeenCalledWith("1");
  });

  it("should return 500 if an internal server error occurs", async () => {
    const errorMessage = "Internal Server Error";
  
    spyGetPerson.mockRejectedValue(new Error(errorMessage));
  
    const event = {
      pathParameters: { id: "1" },
    } as unknown as APIGatewayEvent;
  
    const response = await handler(event);
    
    expect(response.statusCode).toBe(500);
  
    expect(JSON.parse(response.body)).toEqual({
      message: errorMessage,
      details: null,
    });
  
    expect(spyGetPerson).toHaveBeenCalledWith("1");
  
    expect(spyGetPerson).toHaveBeenCalledTimes(1);
  });
  
  it("should return 400 if the ID is missing", async () => {
    const event = {
      pathParameters: {},
    } as unknown as APIGatewayEvent;
  
    const response = await handler(event);
    
    expect(response.statusCode).toBe(400);
  
    expect(JSON.parse(response.body)).toEqual({
      message: "The 'id' parameter is required.",
      details: null,
    });
  
    expect(spyGetPerson).not.toHaveBeenCalled();
  });
  

});
