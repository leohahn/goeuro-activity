angular
  .module('githubRepos')
  .factory('githubService', githubService)

function githubService ($q, $http, $log, EVENT) {
  return {
    getRepos: getRepos
  }
  //-------------------

  function getRepos (username) {
    const timeout = $q.defer()
    let timedOut = false

    setTimeout(() => {
      timedOut = true
      timeout.resolve()
    }, 4000);

    return $http({
      method: 'GET',
      url: 'https://api.github.com/users/' + username + '/repos',
      timeout: timeout.promise
    }).then((response) => {
        return {
          type: EVENT.UserFound,
          repos: response.data.map((rep) => {
            return {
              name: rep.name,
              href: rep.html_url
            }
          })
        }
      })
      .catch((e) => {
        if (e.status === -1 || timedOut) {
          return {
            type: EVENT.NonResponsiveApi,
            repos: null
          }
        } else if (e.status === 404) {
          return {
            type: EVENT.UserNotFound,
            repos: null
          }
        } else {
          return {
            type: EVENT.Unhandled,
            repos: null
          }
        }
      })
  }
}
