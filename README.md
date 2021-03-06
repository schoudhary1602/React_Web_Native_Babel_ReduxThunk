# React_Web_Native_Babel_ReduxThunk


Boilder plate which shares application logic between a React Web app and a React Native app, while keeping the individual component rendering unique to each platform.



## Client app

The app has almost all major implementation which are required to start a project and below mentioned module are implemented to avoid rework for setting up the project and writing some basic flow like 


Technologies Used
- Client Side 
- React
- React Native
- Redux
- Webpack
- Babel

## Server Side 

### Technologies Used

- Node JS  (Express Framework)
- Postgress (Can run on any latest version) (App will automatically create all the tables)

### Implemented Rest API's

- Login 
- Signup
- Forget Password 
- Dashboard 
- Update profile

### Configuring DB
For configuring DB alter the details in DBConfig.js

### Configuring Email Server
For Configuration Email server check for EmailServer.js file and put the credentials to enable any email account.




## Directories 

Native folder houses all the mobile side component which will render on any mobile and web folder will contins all the files require for running web application.

The app itself is based on my React/Webpack/ Redux, for more info on that head over there. The only key difference can be found in app/native, and app/web. What's going on here is both the native app and web app are sharing their core application logic, while keeping the individual rendering separate.


## Entry Points

The entry point for the iOS/Android app is App.js, and for the web app is src/app/web/index.html.


## Running applications 

There are 3 defined scripts in [package.json] which are commonly used:

- start-ios
- start-android
- start-web


before running any of the application(Web/Native) please run  "npm run install" and then "npm run update" then use any of the above mention commands. 




start-ios and start-android : are used when running the native application. When you open either the XCode project or the android studio project and hit "run", it kicks off a node server via the start command. Every time you make a JavaScript change, instead of needing to rebuild and recompile your application, you simply refresh the app and the changes are magically there. As this is not a React Native guide I will not be going into more detail.

start-web will kickoff clients web application on port 3001 so you can use http://localhost:3001/ to access the first login page 

## Note 
Please note client App (Web client App) will run on port: 3001 and Node server will run on port: 3000


## For Node server user 

npm run start: For running the server to access rest API