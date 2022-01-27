import { bookedApiUrl, configApiUrl } from "../constants/sequencingTableConfig";

export const getTableConfig = () => {
  try {
    const calendarConfig = fetch(configApiUrl).then((response) =>
      response.json()
    );
    return calendarConfig;
  } catch (error) {
    return error;
  }
};

export const getBooked = (activeDay: number) => {
  console.log(activeDay);
  try {
    const booked = fetch(bookedApiUrl).then((response) => response.json());

    return booked;
  } catch (error) {
    return error;
  }
};
