// import axios from "axios";

let environment;
let url;
// url = process.env.REACT_APP_DEV_API;
url = process.env.REACT_APP_PROD_API;
// url = "http://172.16.6.216:5000"

if (
  window.location.host.includes("localhost") ||
  window.location.host.includes("127")
)
  environment = "development";
else environment = "production";

if (environment === "production") url = process.env.REACT_APP_PROD_API;

export const BASE_URL = url;

export const ROLE = {
  SuperAdmin: "DA Prep Admin",
  Manager: "DA Prep manager",
  Student: "Student",
  BusinessManager: "Business manager",
  BusinessStudent: "Business student",
  BusinessAdmin: "Business admin",
};
export const USER_STATUS = {
  active: 1,
  inactive: 2,
  blocked: 3,
  deleted: 4,
};

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const getStatusByValue = (value) => {
  return getKeyByValue(USER_STATUS, value);
};

// async function getAccessTokenFromCode(code) {
//   const { data } = await axios({
//     url: `https://oauth2.googleapis.com/token`,
//     method: "post",
//     data: {
//       redirect_uri: "https://www.example.com/authenticate/google",
//       grant_type: "authorization_code",
//       code,
//     },
//   });
//   // console.log(data);
//   // { access_token, expires_in, token_type, refresh_token }
//   return data.access_token;
// }
