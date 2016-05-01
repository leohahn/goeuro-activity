describe('resultsView directive', () => {
  let elem, scope, controller

  beforeEach(module('githubRepos'))
  beforeEach(module('templates'))
  beforeEach(inject((_$rootScope_, _$compile_, EVENT) => {
    _$rootScope_.view = {
      type: EVENT.Initial,
      repos: null
    }
    elem = angular.element(
      '<ex-results-view view="view"></ex-results-view>'
    )
    _$compile_(elem)(_$rootScope_.$new())
    _$rootScope_.$digest()

    controller = elem.controller('exResultsView')
    scope = elem.isolateScope() || elem.scope()
  }))

  it('starts showing no views', inject((EVENT) => {
    // There nothing on screen
    expect(elem.find('ex-view-panel').length).toBe(0)
    expect(elem.find('ul').length).toBe(0)

    expect(controller.isNonResponsiveApiView(controller.view)).toBe(false)
    expect(controller.isUserNotFoundView(controller.view)).toBe(false)
    expect(controller.isRepositoriesView(controller.view)).toBe(false)
    expect(controller.isNoRepositoriesView(controller.view)).toBe(false)
    expect(controller.isLoading(controller.view)).toBe(false)
  }))

  it('shows a loading icon when loading', inject((EVENT) => {
    scope.ctrl.view = {
      type: EVENT.Loading,
      repos: null
    }
    scope.$digest()

    expect(elem.find('i').length).toBe(1) // Loading icon
    expect(elem.find('ex-view-panel').length).toBe(0)
    expect(elem.find('ul').length).toBe(0)

    expect(controller.isNonResponsiveApiView(controller.view)).toBe(false)
    expect(controller.isUserNotFoundView(controller.view)).toBe(false)
    expect(controller.isRepositoriesView(controller.view)).toBe(false)
    expect(controller.isNoRepositoriesView(controller.view)).toBe(false)
    expect(controller.isLoading(controller.view)).toBe(true)
  }))

  it('shows no repositories view', inject((EVENT) => {
    scope.ctrl.view = {
      type: EVENT.UserFound,
      repos: [] // empty repositories
    }
    scope.$digest()
    // There is one panel and no list
    expect(elem.find('ex-view-panel').length).toBe(1)
    expect(elem.find('ul').length).toBe(0)

    expect(controller.isNonResponsiveApiView(controller.view)).toBe(false)
    expect(controller.isUserNotFoundView(controller.view)).toBe(false)
    expect(controller.isRepositoriesView(controller.view)).toBe(false)
    expect(controller.isNoRepositoriesView(controller.view)).toBe(true)
    expect(controller.isLoading(controller.view)).toBe(false)
  }))

  it('shows repositories view', inject((EVENT) => {
    scope.ctrl.view = {
      type: EVENT.UserFound,
      repos: [{name: 'repo', href: 'myhref'}] // non empty repositories
    }
    scope.$digest()
    // There is a list of repositories and no panels
    expect(elem.find('ex-view-panel').length).toBe(0)
    expect(elem.find('ul').length).toBe(1)

    expect(controller.isNonResponsiveApiView(controller.view)).toBe(false)
    expect(controller.isUserNotFoundView(controller.view)).toBe(false)
    expect(controller.isRepositoriesView(controller.view)).toBe(true)
    expect(controller.isNoRepositoriesView(controller.view)).toBe(false)
    expect(controller.isLoading(controller.view)).toBe(false)
  }))

  it('shows user not found view', inject((EVENT) => {
    scope.ctrl.view = {
      type: EVENT.UserNotFound,
      repos: null
    }
    scope.$digest()
    // There is one panel and no list
    expect(elem.find('ex-view-panel').length).toBe(1)
    expect(elem.find('ul').length).toBe(0)

    expect(controller.isNonResponsiveApiView(controller.view)).toBe(false)
    expect(controller.isUserNotFoundView(controller.view)).toBe(true)
    expect(controller.isRepositoriesView(controller.view)).toBe(false)
    expect(controller.isNoRepositoriesView(controller.view)).toBe(false)
    expect(controller.isLoading(controller.view)).toBe(false)
  }))

  it('shows non responsive api view', inject((EVENT) => {
    scope.ctrl.view = {
      type: EVENT.NonResponsiveApi,
      repos: null
    }
    scope.$digest()
    // There is one panel and no list
    expect(elem.find('ex-view-panel').length).toBe(1)
    expect(elem.find('ul').length).toBe(0)

    expect(controller.isNonResponsiveApiView(controller.view)).toBe(true)
    expect(controller.isUserNotFoundView(controller.view)).toBe(false)
    expect(controller.isRepositoriesView(controller.view)).toBe(false)
    expect(controller.isNoRepositoriesView(controller.view)).toBe(false)
    expect(controller.isLoading(controller.view)).toBe(false)
  }))
})
