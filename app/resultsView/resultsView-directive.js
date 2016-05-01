angular
  .module('githubRepos')
  .directive('exResultsView', directive)

/*
 * Directive that receives a one-way binding named view.
 * View contains a type and maybe a repos property.
 *
 * The type represents what should the results-view render on screen,
 * and if the type is EVENT.UserFound, it also receives its repositories
 * through the repos property (maybe empty).
 */
function directive () {
  return {
    scope: {},
    bindToController: {
      view: '<'
    },
    controller: ResultsViewCtrl,
    controllerAs: 'ctrl',
    templateUrl: 'resultsView/resultsView.html'
  }
}

ResultsViewCtrl.$inject = ['EVENT']

function ResultsViewCtrl (EVENT) {
  let vm = this

  vm.isLoading = (view) => {
    return view.type === EVENT.Loading
  }

  vm.isNonResponsiveApiView = (view) => {
    return view.type === EVENT.NonResponsiveApi
  }
  vm.isUserNotFoundView = (view) => {
    return view.type === EVENT.UserNotFound
  }
  vm.isRepositoriesView = (view) => {
    return view.type === EVENT.UserFound && view.repos.length > 0
  }
  vm.isNoRepositoriesView = (view) => {
    return view.type === EVENT.UserFound && view.repos.length === 0
  }
}
