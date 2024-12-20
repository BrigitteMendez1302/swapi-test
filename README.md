
# Serverless API - Star Wars Integration

## **Developed by:** Brigitte Mendez

---

## **Project Description**

This Serverless API integrates with the [Star Wars API (SWAPI)](https://swapi.py4e.com/) to provide endpoints for retrieving Star Wars-related data, with models adapted to a structured format and fields translated into Spanish using **AWS Translate**. 

The API is deployed on **AWS Lambda** using the **Serverless Framework**, with **DynamoDB** as the primary database. 

The main functionalities include:
1. **Retrieving Star Wars data**, such as people and vehicles.
2. **Creating and getting custom vehicle entries**.
3. **Translating API responses dynamically into Spanish**.

---

## **Key Features**

- **Developed with**: Node.js 20.x + Serverless Framework + TypeScript.
- **Database**: DynamoDB.
- **Translation**: AWS Translate integration for dynamic field translations.
- **Documentation**: OpenAPI.
- **Deployment**: AWS Lambda + API Gateway.
- **Testing**: Jest for unit testing.

---

## **Installation**

### **Requirements**
- Node.js 20.x
- Serverless Framework
- AWS CLI with credentials configured

### **Steps to Install**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/BrigitteMendez1302/swapi-test.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Deploy the API**:

   ```bash
   serverless deploy
   ```

4. **Run tests**:

   ```bash
   npm test
   ```

---

## **Endpoints**

### **GET /people/{id}**
- **Description**: Fetch a person from the Star Wars API by ID, with translated field names.
- **Response Example**:
   ```json
    {
        "message": "Person retrieved successfully",
        "data": {
            "nombre": "Biggs Darklighter",
            "altura": "183",
            "masa": "84",
            "color_de_cabello": "black",
            "color_de_piel": "light",
            "color_de_ojos": "brown",
            "año_nacimiento": "24BBY",
            "género": "male",
            "mundo natal": "https://swapi.py4e.com/api/planets/1/",
            "películas": [
                "https://swapi.py4e.com/api/films/1/"
            ],
            "especie": [
                "https://swapi.py4e.com/api/species/1/"
            ],
            "vehículos": [],
            "naves estelares": [
                "https://swapi.py4e.com/api/starships/12/"
            ],
            "creado": "2014-12-10T15:59:50.509000Z",
            "editado": "2014-12-20T21:17:50.323000Z",
            "url": "https://swapi.py4e.com/api/people/9/"
        }
    }
   ```

### **GET /vehicles**
- **Description**: Retrieve all vehicles stored in the DynamoDB database.
- **Response Example**:
   ```json
    {
        "message": "Vehicles fetched successfully.",
        "data": [
            {
                "model": "Digger Crawler",
                "created_at": "2024-12-19T23:10:14.331Z",
                "passengers": "56",
                "cost_in_credits": "150000",
                "vehicle_class": "toyota rush",
                "id": "55e923b2-d058-4aab-9708-ecd0ab9d1c86",
                "name": "Sand Bri",
                "crew": "46"
            }
        ]
    }
   ```

### **POST /vehicles**
- **Description**: Create a new vehicle entry in the database.
- **Request Body Example**:
   ```json
    {
    "vehicle_class": "toyota rush",
    "model": "Digger Crawler",
    "name": "Sand Bri",
    "passengers": "56",
    "cost_in_credits": "150000",
    "crew": "46"
    }
   ```
- **Response Example**:
   ```json
    {
        "message": "Vehicle created successfully.",
        "data": {
            "vehicle_class": "toyota rush",
            "model": "Digger Crawler",
            "name": "Sand Bri",
            "passengers": "56",
            "cost_in_credits": "150000",
            "crew": "46",
            "id": "f4def2dd-0e8a-4e46-8ffa-55ea6586b3a4",
            "created_at": "2024-12-20T12:51:26.742Z"
        }
    }
   ```

---

## **Advanced Features**

1. **Dynamic Translation**:
   - Translates field names dynamically from English to Spanish using AWS Translate.
   
2. **Database Integration**:
   - Stores vehicle data in DynamoDB, with UUID-based unique identifiers.

3. **Scalable Deployment**:
   - Fully serverless architecture ensures scalability and cost-efficiency.

---

## **Testing**

- Unit tests and integration tests are implemented using Jest.
- Run all tests:
   ```bash
   npm test
   ```

---

## **Generate Documentation**

- OpenApi documentation
- Generate documentation in yml and postman collection:
   ```bash
   serverless openapi generate -o openapi.yml -f yaml -p postman.json
   ```

---

## **Postman Collection**

For testing endpoints, visit this link [Postman Collection](https://www.postman.com/security-pilot-62443805/indra-test/collection/rhc0i5c/indra-test-endpoints).

---

## **Contributing**

1. Fork this repository.
2. Create a branch for your feature:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Push your branch:
   ```bash
   git push origin feature/my-feature
   ```
4. Open a pull request for review.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
