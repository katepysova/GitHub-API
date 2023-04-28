# GitHub API Project

This project uses [The GitHub API](https://docs.github.com/en) - the APIs that you can use to interact with GitHub.

See [Project Demo](https://katepysova.github.io/GitHub-API/) serviced on GitHub Pages.

## Installation

1. Clone this repo or downloand zip:

   `git@github.com:katepysova/GitHub-API.git`

2. Change your current directory to this project directory.

3. `npm install`

4. `npm run prepare` - to install git pre-commit hook. Does not work not in a git repository.

5. `git add .husky/pre-commit` - to add git pre-commit hook.

## How to run

- `npm run start` - to start the app on the localhost. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- `npm run predeploy` - to build the app for production to the `build` folder.
  Your app is ready to be deployed!

- `npm run deploy` - to deploy the app on the [GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages).
  See [Notes on client-side routing](https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing).

## Additional

`npm run format` - to format and lint the code.
