export const msalConfig = {
  auth: {
    clientId: "23cca55b-f0ea-4d5c-a7a8-0264cd938f3a",
    authority:
      "https://login.microsoftonline.com/3d1d815e-5346-4244-9f7b-62b78fb742b1",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};
//
