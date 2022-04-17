# Movie Finder

##HOSTED APP: "https://mf-movie-finder.web.app/"

## Epic

Using https://omdbapi.com/ API, create an app that does search for all titles matching user input and displays UI based on output from said API.

## User Story

    As a user I want to search for all titles matching my input
    - When page loads there’s an input for user to enter search criteria
    - When user clicks search a table showing the results matching / similar to the user input from the https://omdbapi.com/ API is displayed
    - When search results are greater than 10, user is provided with buttons to manage pagination

## Approach

- `React-testing library` and `Jest` were used to manage tests.
  As a personal preference when working on the frontend I tend to start with the basic look of the interface before implementing functionality. In accordance with TDD principles I started with a wireframe of what the interface should look like and proceeded as follows

1. Wrote a test to ensure the APP interface is rendered
2. Added the Code to make the test pass
3. Added a test for each component to be displayed on the App Page
4. Added Each Component Folder with corresponding test for Visual Elements
5. Added Code to ensure each visual test passes
6. The SearchForm Component was then updated to include test that affects how users interact with some aspects of the App
   - Ensuring users cannot submit an empty request
   - Ensuring that users can actually enter a request
   - Ensuring that the buttons become enabled when a user enters a value to search
   - Ensuring that on button click a preloader is displayed to while results are being fetched
7. State Management was done with the React Context API
8. Integration Tests were handled within the App.test.tsx file to include
   - The results are only displayed when a valid input is submitted
   - An error message is displayed when the api returns an error eg. Result not found
9. Refactored code where neccesary

## TODO

- Improve tests on the pagination elements
- Extract secrets into the environment ( InApp because of the hosting platform used )
- Make the page look better stylewise

## Other Information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
