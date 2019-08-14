# How to pass environment variables at building time in an Angular application using `.env` files


## The Angular way

With Angular you can store important and very fast changeable information in the `environment.ts` files.

The problem comes when you do not want to commit them in the repository. If something is changing backend side, for example the link to the API, you need to update those files and commit them again. Furthermore, in an Agile process, you need to pass Code Review, Test and many other steps to certify the ticket as "Done". You may also need to set up properly the `angular.json` file for each environment, etc.

This is sometimes tedious and boring and takes a lot of time.


## The `.env` solution

Instead of having multiple `environment.ts` committed in the repository, we should create as many `.env` files as we need, so all the details can be safely stored locally on a developer machine and not published.

The information stored can change quickly and with just sharing the details between the people that are responsible for those informtaion (i.e. Backend and Frontend developers).

Furthermore, if you are using cloud systems like Heroku, AWS, or other, to build your application, you can usually set those environment's information directly in the cloud system setting.

## The `.env` files in JavaScript

In a local Node environment is easy to read a `.env` file, so it should be easy also in a TypeScript environment (in the end it is all JavaScript, isn't it?).

Indeed, during the build of the Angular application, we are using dotenv node module to read the .env and store the information that we need in the environment.ts file that we are creating at the same time..

### The "magic" file

All the "magic" is done by the following `set-env.ts` file that we put in the root folder of the Angular project. In here we are actually going to create the environment.ts filled with the information taken from the .env.
```
import { writeFile } from 'fs';
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const colors = require('colors');
require('dotenv').load();
// `environment.ts` file structure
const envConfigFile = `export const environment = {
   apiBaseUrl: '${process.env.API_BASE_URL}',
   apiUrl: '${process.env.API_URL}',
   appName: '${process.env.APP_NAME}',
   awsPubKey: '${process.env.AWSKEY}',
   nodeEnv: '${process.env.NODE_ENV}',
   production: '${process.env.PRODUCTION}'
};
`;
console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));
writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});
```

Apart the colours used for the logs (by colors module, to have a bit of debug of what will be written in the environment.ts), the concept is pretty clear: we are accessing the process.env variable made available by Node, and creating/overwriting the environment.ts file that contains the environment object as in any Angular project.
Yes, I said "creating/overwriting" because fs module is creating the file even if this is not existing. So we can have an empty environments folder in the Angular project committed in the repository.
Adjust the npm scripts
Last thing to keep in mind is to change or add the scripts in your package.json file because the set-env.ts must run before any of the other Angular-CLI commands.
In the end, we will have something like this:
{
    ...
    "scripts": {
        "ng": "ng",
        "config": "ts-node set-env.ts",
        "start": "npm run config && node server",
        "build": "npm run config && ng build",
        "test": "npm run config && ng test",
        "lint": "ng lint",
        "e2e": "ng e2e",
        "server": "npm run config && ng serve --port $PORT",
        "postinstall": "npm run build"
    },
    "dependencies": {
        ...
        "colors": "^1.1.2",
        "dotenv": "^5.0.0",
        ...
    },
    "devDependencies": {
        ...
        "ts-node": "~5.0.1",
        ...
    }
    ...
}
Remember to add also the dependencies and the devDependencies highlighted.
In particular:
colors is used just to print some colours in console during the build (helpful for debugging);
dotenv is used to read the .env file (some cloud systems require it in the dependencies node, else you can put it in the devDependencies);
ts-node is a sort of Node wrapper for TypeScript, it is used simply to run the set-env.ts that we created earlier as this is a TypeScript file. I prefer this way because it is maintaining consistency in the language used by Angular, but you can easily transform this file into a JavaScript one and run it via Node and forget about this dependency.

At this point we should run the npm scripts instead of the Angular-CLI commands, or remember to run the "magic" file first to create/change the environment.ts file if we have changed some configuration in our development.
A note about the scripts
If you need to have multiple instances of different Angular projects, then you can specify the port before running the server script, for example:
export PORT=5200; npm run server
or simply
PORT=5200 && npm run server
If you do not specify the port number, the default 4200 is taken.


---

Conclusion
In this article we have seen a solution to pass environment's variables to an Angular 2/4/5/6/7 application without having to commit the environment.ts files with the information that we may want to keep away from the repository.
As we have seen, this is possible by creating just one environment.ts file at building time.
Final Note
Keep in mind that in a Front End world, it is pretty much impossible to keep anything hidden from the final user (the code can always be inspected in any browser). For this reason, the use of secret keys and passwords in this world have to be considered very carefully and under a secure structure managed backend side.





This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
