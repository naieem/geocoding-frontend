## Project details

In the project directory, you can run:

### `npm i`
Install all the dependencies first before running the project.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Configurations
**src/config.js
```
{
    baseUrl: "http://localhost:5000/", // backend service url
    apiKey: "", // google maps active api key
    initialCenter: {
        lat: ,
        lng: 
    } // initial map position
}
```
 `Thats all you are all set to go.`