# MLH Prep Project

Over the next 2 weeks, you'll be building a React App that works with various APIs (Application Programming Interfaces) that talk to different data sources to do cool stuff.

We're using the [OpenWeather API](https://openweathermap.org/current) to get weather data on different cities. Your challenge over the next 2 weeks is to build out this website and add even more functionality to it. At the moment, it displays basic information about a location when you type it in. Check out [Issues](/issues) for some more ideas!

You'll need to get your own API Key from their website (for free) and add it as an environment variable in a `.env` file. We have a template available as `example.env`.

You'll be using React initially to build this. If you're new to React, check out the [website](https://reactjs.org) for some information on getting started! 

# Project Setup for Windows OS:
### 1. Fork the project:
> _This creates a copy of the project into repositories of your GitHub account_

### 2. Clone the forked repository:

  You need to clone (download) it to your local machine using the below command in terminal
```bash
   $ git clone https://github.com/Your_username/prep-project-23.MAR.PREP.2.git
```
> Replace `Your_username` with your github username because your cloning the forked repository that exists in your github repositories.
> _This creates a local copy of the repository in your local machine_

### 3. Navigate to the forked repository:
Once you have cloned the `prep-project-23.MAR.PREP.2` repository into your local machine, move into that folder using the change directory `cd` command on Linux/ Mac/ Windows
```bash
   $ cd prep-project-23.MAR.PREP.2
```

Next, open the project folder in your favorite code editor/IDE to start coding(the actual game)
### 4. Installing node and npm:
You need to install node into your machine. navigate to [Node.js Download Page](https://nodejs.org/en/download/) and download the latest version that suits your OS and system architecture(x32, x64, x86)
check the version of node using below command:
```bash
   $ node -v
```

npm comes installed with node, check npm version using below command:
```bash
   $ npm -v
```

> you can install nvm(optional), if you want to manage your node versions which needing to uninstall and install everytime when you want to change the version of node.

### 5. starting the development server:
After node and npm are ready on your system, now run the below command to install the dependencies if any:
```bash
   $ npm install
```

If it says there are some vulnerabilities, try running below command to fix some of the non-critical ones:
```bash
   $ npm audit fix
```

Then run the below command to start the development server:
```bash
   $ npm start
```

If the development server didn't start and if it throws the error `Error: error:0308010c:digital envelope routines::unsupported`, then one of the possible fix is to `update the react-scripts`
Steps to do the fix:
1. Check the `package.json` file
2. see if `react-scripts` version under `dependencies`is < 5.0.0. if so try updating using below commands:
```bash
   $ npm uninstall react-scripts
   $ npm install react-scripts
```
3. then run the command `$ npm start` to start the development server on your local machine again.

For more information, refer this [link](https://www.freecodecamp.org/news/error-error-0308010c-digital-envelope-routines-unsupported-node-error-solved/)

> Disclaimer: Do not run `$ npm audit fix --force` to fix the vulnerabilities because this breaks/downgrades the react-scripts version


