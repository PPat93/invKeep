# InvKeep

An application on which I am enhancing my coding skills. \
Angular with TypeScript + Node.js with Express.js + MongoDB.

![invKeepMain](https://user-images.githubusercontent.com/45639693/120713631-7b85d500-c4c2-11eb-9eba-e456e93fca1e.PNG)

![invKeepCreate](https://user-images.githubusercontent.com/45639693/118302344-6087fc80-b4e4-11eb-8434-c57f3890f355.PNG)

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


