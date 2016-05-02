;(function () {
  'use strict'

  angular
    .module('githubRepos')
    .directive('exUserInput', directive)

  /*
   * Directive that has a button and an input. It saves the value of the input
   * inside `credentials.name`, and calls the function `onGetReposClick` received
   * from its parent with `credentials.name` as an argument. It does not call
   * the function, however, when `credentials.name` is empty.
   */
  function directive() {
    return {
      scope: {},
      bindToController: {
        onGetReposClick: '&'
      },
      controller: UserInputCtrl,
      controllerAs: 'ctrl',
      templateUrl: 'userInput/userInput.html'
    }
  }

  function UserInputCtrl () {
    let vm = this

    vm.credentials = {
      username: ''
    }
  }
}())
