# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000] to view it in your browser.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Auth 
`authenticator.js`: takes children as props checks localstorage for user and wallet connection.
`authenticatorAdmin.js`: takes children as props checks localstorage for admin connection.
`authProvider.js`: user authentication for login, logout based on user role (user / admin)

# Components 

## Footer
`index.jsx`: Footer with social icons and copyright text

## Metamask (wallet integration)
`errorMessage.js`: Displays an error if encountered
`index.js`: It uses the window.ethereum API provided by the MetaMask browser extension to interact with Ethereum-based blockchain networks.The code is for connecting to a wallet and interacting with the Ethereum network. It includes functionalities such as connecting to the wallet, checking the chainId, redirecting the user, changing networks, displaying error messages, and setting up event listeners for changes in the connected wallet and network.

## Navbar
`index.js`: It display a navigation bar. The bar has several links to different pages , and the links change based on the user's role (Admin or Non-Admin). The component uses useAuth and useNavigate hooks from the authProvider file to handle user logout and navigation to different pages. The component also uses local storage to retrieve the user's information to determine which links to display based on the user's role.

## Toaster
`index.js`: Displays api responses and errors.

# Pages

## Admin 

### Pool
`index.jsx`: Displays a list of reward pots with details such as pot type, asset type, start date, end date, claim expiry date, reward token amount, ticker, contract address, and asset name. 
`addPot.jsx`:It allows users to create and edit "Reward Pot" or "Lottery Pot". The component makes API calls with `getRewardPotById` to get the details of a pot by its ID and display it in the form. The component uses the Toaster component to display error messages.

## AdminDashboard
`index.js`: Displays admin dashboard

## Dashboard
`index.js`: It is a React functional component that provides several functionalities like displaying modals for different events, subscribing to the email list, and showing a toaster message. The component has several state variables like email, validated, loading, and toasterMessage to manage the different functionalities. The component has several event handlers like handleShow, handleHide, handleSubmit, and setErrorMsgFunc to handle different events.

## Error404
`index.js`: Displays page not found for non-existing routes

## Login
`index.js`: Displays a login form and validates the credentials using auth() dunction from authProvider component.

## Party
`index.jsx`: Displays party page

## Pool
`index.jsx`: Displays modal window for Lottery pool or Reward pool.

## Roadmap
`index.jsx`: Dispays roadmap.

## Wallet
`index.jsx`: Displays wallet information connected to user accounnt.

# Routes
`index.jsx`: A RFC named as Navigationrouter() handles the routing and navigation of the application. It uses the localStorage to determine if the user is authenticated and whether to show an authenticated route or not.

# Services `API CALLS`

## Admin
`index.js`: All admin api calls are made here with the use of axiosInstance function from interceptor.

## Auth
`index.js`: User login api call is made here with the use of  axiosInstance function from interceptor.


## Interceptor
`index.js`: This code sets up an axios instance with a base URL from the environment and adds request and response interceptors to add authentication headers and handle error codes 403 and 401 by logging out the user and navigating to the login page.

## User
`index.js`: All user api calls are made here with the use of axiosInstance function from interceptor.