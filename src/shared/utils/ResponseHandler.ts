export class ResponseHandler {
    static success(data: any, message: string = "Success"): { statusCode: number; body: string } {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message,
          data,
        }),
      };
    }
  
    static error(error: any): { statusCode: number; body: string } {
      let statusCode = 500;
      let message = "Internal Server Error";
  
      if (error instanceof ResponseError) {
        statusCode = error.statusCode;
        message = error.message;
      }
  
      console.error("Error: ", error);
  
      return {
        statusCode,
        body: JSON.stringify({
          message,
          details: error.details || null,
        }),
      };
    }
  }
  
  export class ResponseError extends Error {
    public statusCode: number;
    public message: string;
    public details?: any;
  
    constructor(statusCode: number, message: string, details?: any) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.details = details;
    }
  }
  