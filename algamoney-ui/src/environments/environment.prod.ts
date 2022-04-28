export const environment = {
  production: true,
  apiUrl: 'https://carlos-algamoney-api.herokuapp.com',
  tokenAllowedDomains: [/algamoney-api.herokuapp.com/],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  oauthCallbackUrl: 'https://carlos-algamoney-angular.netlify.app/authorized',
  logoutRedirectUrl: 'https://carlos-algamoney-angular.netlify.app'
};
