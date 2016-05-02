;(function () {
  'use strict'

  angular
    .module('githubRepos')
    .factory('githubService', githubService)

  githubService.$inject = ['$q', '$http', '$log', 'EVENT']

  function githubService ($q, $http, $log, EVENT) {
    return {
      getRepos: getRepos
    }
    //-------------------

    /**
     * Sends a HTTP request to the github api. This request gets all the
     * repositories from the user passed on the parameter, and returns only
     * the relevant information, i.e, objects only with the name of the
     * repository and its url. The request times out after 4 seconds, returning
     * a EVENT.NonResponsiveApi.
     * @param  {string} username
     * @return {promise}          The promise resolves with an object that
     *                            contains an EVENT and a maybe list of repositories.
     */
    function getRepos (username) {
      const timeout = $q.defer()
      let timedOut = false

      // Resolves the timeout promise after four seconds, which in turns
      // interrupts the http request if not yet resolved.
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
            // Here stats === -1 probably means that there is no internet
            // connection, but I assume it is also a non responsive Api.
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
            $log.error('unhandled error: ' + e)
            return {
              type: EVENT.Unhandled,
              repos: null
            }
          }
        })
    }
  }
}())
