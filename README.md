# InvKeep

An application on which I am enhancing my coding skills. \
Angular with TypeScript + Node.js with Express.js + MongoDB.

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
- Import file from `invKeepDatabase` repository folder to previously created collection

After invKeep main page refresh, all imported assets should be displayed.

![invKeep](https://user-images.githubusercontent.com/45639693/117556569-9ce1d580-b06a-11eb-8780-46694befc9b7.PNG)
