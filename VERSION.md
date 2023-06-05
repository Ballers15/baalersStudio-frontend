# Version 0.0.2
* Issues fixed and minor changes in UI

# Version 0.0.1

# Auth 
* `authenticator.js`: Takes children as props checks redux storage for user and wallet connection.
* `authenticatorAdmin.js`: Takes children as props redirects to Homepage if user is not admin.
* `authenticatorUser.js`: Takes children as props redirects to admin dashboard if user is admin.
* `CheckUser.js`: Takes children as props redirects to respective dashboards according to user role used for pages like login, signup and forgot password.
* `CheckUserLogin.js`: Takes children as props redirects to login if user is not logged.
* `authProvider.js`: User authentication for login, logout based on user role (user / admin).

# Components 

## apiLoader
* `index.js`: Loader to be shown whenever an api is hit.

## Footer
* `index.jsx`: Footer with social icons and copyright text.

## Metamask (wallet integration)
* `errorMessage.js`: Displays an error if encountered
* `index.js`: It uses the window.ethereum API provided by the MetaMask browser extension to interact with Ethereum-based blockchain networks.The code is for connecting to a wallet and interacting with the Ethereum network. It includes functionalities such as connecting to the wallet, checking the chainId, redirecting the user, changing networks, displaying error messages, and setting up event listeners for changes in the connected wallet and network.

## Navbar
* `index.js`: It display a navigation bar. The bar has several links to different pages , and the links change based on the user's role (Admin or Non-Admin). The component uses useAuth and useNavigate hooks from the authProvider file to handle user logout and navigation to different pages. The component also uses redux storage to retrieve the user's information to determine which links to display based on the user's role.
* `notificationToggle.jsx`: Displays notifications for user and mark them as read individually or all at once.

## popup
* `index.js`: This popup is shown when game cash is redeemed in any active pot.

## redux
* `action.js`: Exports all the actions or functions made to update state stored in redux store.
* `reducer.js`: Takes current state and actions and returns a new state.
* `store.js`: Holds the state of the application.

## roleBasedAccessControl
* `ability.js`: Ability to view page according to user roles.
* `can.js`: Exports abilityContext.
* `roles.js`: Contains all user roles.

## Smart Contract
* `SmartContract_ABI.js`: Contains claim NFT abi, calim token abi & standard token abi.
* `smartContractHandler.js`: Contains functions to initiate a transaction in metamask wallet.

# functions.js
* `functions.js`: Function to format a large decimal number.

# Environments
* `environment.js`: Contains staging nft data, api url contract addresses and game url.
* `environment.prod.js`: Contains production nft data, api url contract addresses and game url.

# font
* `Valorant-Font.ttf`: Font file

# Pages

## About
* `index.jsx`: About us page

## Admin

### Pool
* `index.jsx`: Displays a list of reward pots with details such as pot type, asset type, start date, end date, claim expiry date, reward token amount, ticker, contract address, and asset name. 
* `addPot.jsx`:It allows users to create and edit "Reward Pot" or "Lottery Pot". The component makes API calls with `getRewardPotById` to get the details of a pot by its ID and display it in the form. The component uses the Toaster component to display error messages.
* `viewPot.jsx`:It allows users to view and edit "Reward Pot" or "Lottery Pot". The component makes API calls with `getRewardPotById` to get the details of a pot by its ID and display it in the form. The component uses the Toaster component to display error messages.

## AdminDashboard
* `index.js`: Displays admin dashboard
* `UsersList.js`: Displays user list in admin dashboard

## Dashboard
* `index.js`: It is a React functional component that provides several functionalities like displaying modals for different events, subscribing to the email list, and showing a toaster message. The component has several state variables like email, validated, loading, and toasterMessage to manage the different functionalities. The component has several event handlers like handleShow, handleHide, handleSubmit, and setErrorMsgFunc to handle different events.

## Error404
* `index.js`: Displays page not found for non-existing routes

## ForgotPassword
* `forgotpassword.jsx`: Forgot password page.

## Login
* `index.js`: Displays a login form and validates the credentials using auth() function from authProvider component.

## Party
* `index.jsx`: Displays party page

## Pool
* `index.jsx`: Displays page for Lottery pool or Reward pool.

## Pots
* `index.jsx`: Parent component for both pot page which contains state variables.
* `activeLotteryPot.jsx`: Active lottery pot section which displays pot status, countdown timer and has functions to fetch and redeem game cash in the active pot.
* `activeRewardPot.jsx`: Active reward pot section which displays pot status, countdown timer and has functions to fetch and redeem game cash in the active pot.
* `lotteryRounds.jsx`: Displays previous lottery rounds with claim button for claiming rewards.
* `rewardRounds.jsx`: Displays previous reward rounds with claim button for claiming rewards.
* `leaderBoardRibbon.jsx`: HTML code for ribbon shown between previous rounds and leaderboard.
* `lotteryLeaderBoard.jsx`: Displays lottery leader board for active pot (if any) else for last round and leader board for previous rounds can be seen.
* `rewardLeaderBoard.jsx`: Displays reward leader board for active pot (if any) else for last round and leader board for previous rounds can be seen.
* `withdrawlLottery.js`: Contains functions to withdraw rewards and confirm transaction status. 

## PrivacyPolicy
* `index.jsx`: Displays privacy policy page.

## ResetPassword
* `resetPassword.jsx`: Displays reset password page.

## Roadmap
* `index.jsx`: Dispays roadmap.

## Signup
* `Signup.jsx`: Displays signup page.
* `googleSignup.jsx`: decrypts auth token to get user information and update user state variable

## UserProfile
* `User.jsx`: Displays user profile.

## Wallet
* `index.jsx`: Displays wallet page.

# Routes
* `index.jsx`: A RFC named as Navigationrouter() handles the routing and navigation of the application. It uses the redux storage to determine if the user is authenticated and whether to show an authenticated route or not.

# Services `API CALLS`

## Admin
* `index.js`: All admin api calls are made here with the use of axiosInstance function from interceptor.

## Auth
* `index.js`: User login api call is made here with the use of  axiosInstance function from interceptor.

## Interceptor
* `index.js`: This code sets up an axios instance with a base URL from the environment and adds request and response interceptors to add authentication headers and handle error codes 403 and 401 by logging out the user and navigating to the login page.

## User
* `index.js`: All user api calls are made here with the use of axiosInstance function from interceptor.
* `indexPot.js`: All pot api calls are made here with the use of axiosInstance function from interceptor.