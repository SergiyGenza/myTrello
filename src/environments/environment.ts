// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAjrn6FKR6v3jgnbapwiIcIAgNEF3ETAEw",
    authDomain: "myowntrello-cc0f9.firebaseapp.com",
    databaseURL: "https://myowntrello-cc0f9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "myowntrello-cc0f9",
    storageBucket: "myowntrello-cc0f9.appspot.com",
    messagingSenderId: "630633496581",
    appId: "1:630633496581:web:c35148561982dc77f51c6c"
  },
  database: 'firebase',
  socialAuthEnabled: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
