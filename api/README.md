# Employee API

Simple Node.js API to get employee data by ID from a JSON file.

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

Server will start on http://localhost:3000

## API Endpoints

### Get employee by ID
```
GET /api/employees/:id
```

Example:
```bash
curl http://localhost:3000/api/employees/1
```

Response:
```json
{
  "id": 1,
  "name": "Sanjay Test",
  "email": "sanjay.test@company.com",
  "department": "Testing",
  "position": "Test Engineer"
}
```

