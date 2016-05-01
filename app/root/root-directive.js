angular
  .module('githubRepos')
  .directive('exRoot', directive)

/*
 * Root directive of the application. This directive calls the Github Api and
 * handles the communication between the exUserInput directive and the
 * exResultsView directive.
 */
function directive () {
  return {
    scope: {},
    controller: RootCtrl,
    controllerAs: 'ctrl',
    templateUrl: 'root/root.html'
  }
}

RootCtrl.$inject = ['githubService', 'EVENT']

function RootCtrl (githubService, EVENT) {
  let vm = this

  vm.onGetReposClick = onGetReposClick
  vm.reposView = {
    type: EVENT.Initial,
    repos: null
  }

  /**
   * This function is passed as a parameter to the exUserInput directive.
   * exUserInput calls this function with the current username on the input field
   * whenever the button `Get Repos` is pressed.
   * This function calls the `getRepos` method from githubService and updates
   * the current view that is going to be rendered by exResultsView directive.
   * @param  {string} username
   * @return {void}
   */
  function onGetReposClick (username) {
    // Updates to a Loading view until the service is not finished.
    vm.reposView = { type: EVENT.Loading, repos: null }
    githubService
      .getRepos(username)
      .then((response) => vm.reposView = response)
  }
}
