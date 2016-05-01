angular
  .module('githubRepos')
  .directive('exViewPanel', function () {
    return {
      scope: {},
      bindToController: {
        type: '@',
        title: '@',
        description: '@'
      },
      controller: function () {},
      controllerAs: 'ctrl',
      templateUrl: 'viewPanel/viewPanel.html'
    }
  })
