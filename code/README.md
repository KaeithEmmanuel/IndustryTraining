# Scrabble

## Setup and Run Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed

## Frontend (React)

### Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

### Run the Development Server
```sh
npm start
```
or
```sh
yarn start
```

This will start the React app on `http://localhost:3000/` by default.

## Backend (Node.js + Express)

### Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

### Run the Server
```sh
npm run dev
```
or
```sh
yarn dev
```

The backend server will start on `http://localhost:5000/` by default.

## Environment Variables
Create a `.env` file in both `frontend` and `backend` directories and add necessary configurations, such as API keys and database URLs.

## Build and Deploy
### Frontend
```sh
npm run build
```
This will generate a `build/` folder for deployment.

### Backend
Ensure your backend is hosted on a server like Heroku, Vercel, or DigitalOcean.

## Contributing
Feel free to fork this repository and submit pull requests.

## License
[MIT](LICENSE)

