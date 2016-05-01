;(function () {
  'use strict'

  angular
    .module('githubRepos')
    .directive('exUserInput', directive)

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
