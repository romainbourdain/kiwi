export const sleep = async (time: number = 1000) => {
  return await new Promise((resolve) => setTimeout(resolve, time));
};
