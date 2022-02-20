# InvKeep

An application on which I am enhancing my coding skills. \
Angular with TypeScript + Node.js with Express.js + MongoDB.

![invKeepMain](https://user-images.githubusercontent.com/45639693/153066939-3a40c1a7-8f1a-4e28-8b58-8a034c02267f.png)

![invKeepAnalysis](https://user-images.githubusercontent.com/45639693/153066687-66b96d1b-5bb8-4ef9-af91-afc28458602b.png)

![invKeepCreate](https://user-images.githubusercontent.com/45639693/153067065-60d49fa6-dc56-40e3-a82c-3803a6581b0d.png)

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

![invKeepTests](https://user-images.githubusercontent.com/45639693/154859149-80098d2f-86fd-4efa-9117-c735e8c9fb2c.png)

![cypressMenu](https://user-images.githubusercontent.com/45639693/154859400-9206f093-1f99-4c96-80df-777dccd69c49.png)

