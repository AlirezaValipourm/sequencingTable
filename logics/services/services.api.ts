import { stringApiUrl } from "../constants/routes.api";
export const getStrings = () => {
  try {
    const pageStrings = fetch(stringApiUrl).then((response) => response.json());
    return pageStrings;
  } catch (error) {
    return error;
  }
};
