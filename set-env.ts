const fs = require('fs');
const colors = require('colors');

// Configure Angular `environment.ts` file path
const targetPath = `./src/environments/environment.ts`;
const none = false;
console.assert(none, 'error');

// Load node modules
process.stdout.write(colors.magenta('Parsing environment file (.env)... '));
const parseEnvFile = require('dotenv').config();

if (parseEnvFile.error) {
    process.stdout.write(colors.red('ERROR'));
    throw parseEnvFile.error;
} else {
    process.stdout.write(colors.green('DONE'));
}

console.log('\n');
console.log(colors.cyan.italic(parseEnvFile.parsed));
console.log('\n');

// Debug environment variables
// console.log(colors.blue('process.env.APP_NAME =', process.env.APP_NAME));
// console.log(colors.blue('process.env.NODE_ENV =', process.env.NODE_ENV));
// console.log(colors.blue('process.env.API_BASE_URL =', process.env.API_BASE_URL));
// console.log(colors.blue('process.env.PRODUCTION =', process.env.PRODUCTION));
// console.log('\n');

// `environment.ts` file structure that uses the environment variables
const envConfigFile = `export const environment = {
    apiBaseUrl: '${process.env.API_BASE_URL}',
    appName: '${process.env.APP_NAME}',
    awsPubKey: '${process.env.AWSAPIKEY}',
    nodeEnv: '${process.env.NODE_ENV}',
    production: '${process.env.PRODUCTION}'
};
`;

console.log(colors.magenta(`The file 'environment.ts' will be written with the following content: \n`));
console.log(colors.gray(envConfigFile));

fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.error(colors.red('There were an error in writing the file'));
        throw console.error(err);
    } else {
        console.log(colors.magenta(`Angular 'environment.ts' file generated correctly at '${targetPath}' \n`));
    }
});
