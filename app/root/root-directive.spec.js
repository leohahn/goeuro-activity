describe('root directive', () => {
  let elem, scope, controller

  beforeEach(module('githubRepos'))
  beforeEach(module('templates'))
  beforeEach(inject((_$rootScope_, _$compile_) => {
    elem = angular.element('<ex-root></ex-root>')
    _$compile_(elem)(_$rootScope_.$new())
    _$rootScope_.$digest()

    scope = elem.isolateScope() || elem.scope()
  }))

  it('defines ex-user-input and ex-results-view', () => {
    expect(elem.find('ex-user-input')).not.toEqual({})
    expect(elem.find('ex-results-view')).not.toEqual({})
  })

  describe('ctrl.reposView', () => {
    it('has initial view with no repositories.', inject((EVENT) => {
      expect(scope.ctrl.reposView).toEqual({
        type: EVENT.Initial,
        repos: null
      })
    }))
  })

  describe('ctrl.onGetReposClick', () => {
    it('is defined', () => {
      expect(scope.ctrl.onGetReposClick).toBeDefined()
    })

    it('gets called when input is not empty', () => {
      spyOn(scope.ctrl, 'onGetReposClick')
      let userInput = elem.find('ex-user-input')
      let userInputScope = userInput.isolateScope()
      userInputScope.ctrl.credentials.username = 'notempty'
      userInput.find('button').triggerHandler('click')
      expect(scope.ctrl.onGetReposClick).toHaveBeenCalledWith('notempty')
    })

    it('does not get called when input is empty', () => {
      spyOn(scope.ctrl, 'onGetReposClick')
      let userInput = elem.find('ex-user-input')
      let userInputScope = userInput.isolateScope()
      userInputScope.ctrl.credentials.username = ''
      userInput.find('button').triggerHandler('click')
      expect(scope.ctrl.onGetReposClick).not.toHaveBeenCalled()
    })
  })
})
