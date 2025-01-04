const appRoute = (path: string) => `${path}` as const;

export const APP_ROUTES = {
  home: appRoute("/"),
  // auth
  login: appRoute("/login"),
  logout: appRoute("/logout"),
  register: appRoute("/register"),
  forgotPassword: appRoute("/forgot-password"),
};
