# InvKeep

An application on which I am enhancing my coding skills. \
Angular with TypeScript + Node.js with Express.js + MongoDB.

### Main Page View
![MainPage](https://user-images.githubusercontent.com/45639693/177018485-93cdf925-11bc-461a-8248-8bcb8e44eefb.PNG)

### Create Page View
![CreatePage](https://user-images.githubusercontent.com/45639693/177018482-3378b6f2-2963-4a35-a756-f69f1eeadcb6.PNG)

### Details Page View
![DetailsPage](https://user-images.githubusercontent.com/45639693/177018483-aa8c64f6-2428-41d7-b971-0f0ebd53572c.PNG)

### Dialog View
![DialogView](https://user-images.githubusercontent.com/45639693/177018484-e8bd8686-cf5d-4678-8608-e6c7ff1c905a.PNG)

## Before everything

Run `npm install` in invKeepFrontend folder.

## Frontend development server

Run `ng serve` in `invKeepFrontend` folder for a dev server. Navigate to `http://localhost:4200/`. The app will
automatically reload if you change any of the source files.

## Backend with Server

Run `npm run start:server` in `invKeepFrontend` folder to start backend server of invKeep. \
To reload changes introduced in backend run `rs` in server console.
`http://localhost:3000/`

## Database

- Having local MongoDB run is enough to use invKeep.
  
### Empty database
- If you don't have installed local MongoDB -> download it from `https://www.mongodb.com/try/download`.
- After installation create folders `C:\data\db`.
- In `C:\Program Files\MongoDB\Server\4.4\bin` (default MongoDB path) run `mongod.exe` -> start local MongoDB.
- To monitor databases, in different console window from `C:\Program Files\MongoDB\Server\4.4\bin` run `mongo.exe`.

Above steps is enough to run the app - create and load assets.

### Import collection to database

- Create database `invKeepDatabase`.
- Inside created database - create `assets` collection.
- Inside created database - create `assetRatios` collection.
- Import files from `invKeepDatabase` repository folder to previously created collections

After invKeep main page refresh, all imported assets should be displayed.

## Tests

Running tests:
- Move to `invKeepTests` folder.
- Run `npx cypress open` command.
- Select spec files that need to be run
- 
### Test Execution Results
![TestExecutionResults](https://user-images.githubusercontent.com/45639693/177018404-35ea2466-444c-431b-ac6e-3b6906aaeafc.PNG)

### Test Suites List
![TestSuitesList](https://user-images.githubusercontent.com/45639693/177018403-860bc712-ca73-47db-bc11-29740f22d01e.PNG)
