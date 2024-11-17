// src/utils/envTest.js
import Constants from "expo-constants";

export const testEnvVariables = () => {
  if (__DEV__) {
    console.log("=== Environment Variables Test ===");
    console.log("App Name:", Constants.manifest2.extra.name);
    console.log("API URL:", Constants.manifest2.extra.apiUrl);
    console.log("API Timeout:", Constants.manifest2.extra.apiTimeout);
    console.log("Debug Mode:", Constants.manifest2.extra.debug);
    console.log("Default Language:", Constants.manifest2.extra.defaultLanguage);
    console.log("===============================");
  }
};
