type GetTokenFn = () => Promise<string | null>;

let getTokenFn: GetTokenFn | null = null;

let tokenReady: Promise<string | null>;
let resolveTokenReady: ((token: string | null) => void) | null = null;

export const setGetToken = (fn: GetTokenFn) => {
  getTokenFn = fn;
  if (resolveTokenReady) {
    fn().then(resolveTokenReady);
    resolveTokenReady = null;
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  if (getTokenFn) return getTokenFn();
  if (!tokenReady) {
    tokenReady = new Promise((resolve) => {
      resolveTokenReady = resolve;
    });
  }
  return tokenReady;
};
