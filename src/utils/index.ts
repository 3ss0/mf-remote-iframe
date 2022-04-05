export const encodeMessage = (type: string, payload?: { data: string }) => {
  return JSON.stringify({
    type,
    payload,
  });
};

export const decodeMessage = (message: string) => {
  return JSON.parse(message);
};
