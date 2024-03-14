export const MAIN_URL = "https://opentdb.com/api.php";
export const TEST_URL = "http://localhost:5173/";

export const API_URL = `${MAIN_URL}?amount=1&category=9&difficulty=easy&type=multiple`;

export const REQUEST_TOKEN =
  "https://opentdb.com/api_token.php?command=request";

export const SUCCESS_MESSAGE = "Check your email for the sign-in link";
export const LOGOUT_MESSAGE = "Successfully logged out!";

export const RESPONSE_CODES = [
  { code: 0, message: "Success" },
  { code: 1, message: "No Results " },
  { code: 2, message: "Invalid Parameter" },
  { code: 3, message: "Token Not Found" },
  { code: 4, message: "Token Empty" },
  { code: 5, message: "Rate Limit" },
];
