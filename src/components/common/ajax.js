export const fetchResterData = async (url) => {
  const response = await fetch(url);
  return response.status === 200 ? response.json() : false;
};
