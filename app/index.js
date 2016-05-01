// Definition of the application module and all of its constants
angular
  .module('githubRepos', [])
  .constant('EVENT', {
    Loading: 'EVENT_LOADING',
    UserFound: 'EVENT_USER_FOUND',
    UserNotFound: 'EVENT_USER_NOT_FOUND',
    NonResponsiveApi: 'EVENT_NON_RESPONSIVE_API',
    Initial: 'EVENT_INITIAL'
  })
