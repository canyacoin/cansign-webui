// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyAAhCINP26Yn9Rx4p49iy8CSJHLogIV3Yk',
    authDomain: 'can-sign.firebaseio.com',
    databaseURL: 'https://can-sign.firebaseio.com',
    projectId: 'can-sign',
    storageBucket: '',
    messagingSenderId: ''
  }
};
