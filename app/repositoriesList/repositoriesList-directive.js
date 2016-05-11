angular
  .module('githubRepos')
  .component('exRepositoriesList', {
    bindings: {
      repos: '<'
    },
    controller: function () {},
    controllerAs: 'ctrl',
    templateUrl: 'repositoriesList/repositoriesList.html'
  })
