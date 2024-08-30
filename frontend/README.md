# Frontend User Fetcher

## Description

This is a simple React application built with Vite that fetches and displays fictional users. The application loads 100
users at a time as the user scrolls down, providing an infinite scroll experience. The UI is styled with Material-UI.

## Requirements

- Node.js (version 18.3.1 or higher)
- npm (or Yarn)

## Installation and Running Locally

1. Install Dependencies
   ```bash
   npm install
   ```
2. Run the Application
   ```bash
   npm run dev
   ```

The application will be running at http://localhost:5173.

## Usage

The application automatically loads and displays users in a grid layout. As you scroll down, more users will be fetched
and displayed.

## API

The application fetches user data from the following API:

- URL: https://random-data-api.com/api/v2/users?size=100
- Method: GET

## Contact

For any questions or comments, please contact me at https://www.linkedin.com/in/juan-valera-reales/
