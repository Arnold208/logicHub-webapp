let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const setRefreshToken = (token: string | null) => {
  refreshToken = token;
};

export const getRefreshToken = () => {
  return refreshToken;
};

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
};
