type GetTokenFn = () => Promise<string | null>;

let getTokenFn: GetTokenFn | null = null;
let tokenReadyResolve: ((fn: GetTokenFn) => void) | null = null;

const tokenFnReady: Promise<GetTokenFn> = new Promise((resolve) => {
  tokenReadyResolve = resolve;
});

export const setGetToken = (fn: GetTokenFn) => {
  getTokenFn = fn;
  if (tokenReadyResolve) {
    tokenReadyResolve(fn);
    tokenReadyResolve = null;
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  const fn = getTokenFn || (await tokenFnReady);
  return fn();
};
