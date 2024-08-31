# Backend Pokémon API

## Description

This is a simple Node.js application that exposes two endpoints related to Pokémon, utilizing the PokeAPI. The
application is containerized using Docker, which facilitates its deployment and execution across different environments.

## Requirements

- Node.js (version 22.2.0 or higher)
- Docker (optional, if you want to run the application in a container)
- pnpm (recommended)
- npm or yarn (optional)

## Installation and Running Locally

### 1. Install Dependencies

Using pnpm (recommended):

   ```bash
   pnpm install
   ```   

Alternatively, you can use npm or yarn:

   ```bash
   npm install
   ``` 

   ```bash
   yarn install
   ``` 

### 2. Run the Application
Using pnpm (recommended):

   ```bash
   pnpm run dev
   ```

Alternatively, you can use npm or yarn:

   ```bash
   npm run dev
   ```

   ```bash
   yarn dev
   ```

The application will be running at http://localhost:3000.

## Endpoints

### 1. POST /pokemon/findByName

Finds a Pokémon by its name and returns its base experience, height, and weight.

- URL: /pokemon/findByName

- Method: POST

- Body:

```json
{
  "name": "PIKa chu"
}
```

- Response:

```json
{
  "count": 1,
  "results": [
    {
      "base_experience": 112,
      "name": "pikachu",
      "height": 4,
      "weight": 60
    }
  ]
}
```

### 2. GET /pokemon/csv/:color

Returns a CSV file with details of Pokémon of a specific color.

- URL: `/pokemon/csv/:color`
- Method: `GET`
- Example: `/pokemon/csv/yellow`
- Response: A downloadable CSV file with the following format:

```csv
name,base_experience,height,weight
pikachu,112,4,60
...
```

## Docker

### Build the Docker Image

To build te Docker image of the application, run the following command in the project root:

```bash
docker build -t backend .
```

### Run the application in Docker

To run the application in a Docker container, use the following command:

```bash
docker run -d -p 3000:3000 --name backend-container backend
```

This will make the application available at `http://localhost:3000`

### Stop and remove the Container

If you need to stop and remove the container:

```bash
docker stop backend-container
docker rm backend-container
```

### Deployment considerations

This application is designed to be deployed in a cluster. The included Dockerfile allows creating an image that can be
used on container orchestration platforms such as Kubernetes, Docker Swarm, among others.

### Contact

For any questions or comments, please contact me at https://www.linkedin.com/in/juan-valera-reales/ 
