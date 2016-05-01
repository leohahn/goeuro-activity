describe('userInput directive', () => {
  let elem, scope, controller

  beforeEach(module('githubRepos'))
  beforeEach(module('templates'))
  beforeEach(inject((_$rootScope_, _$compile_) => {
    elem = angular.element(
      '<ex-user-input on-get-repos-click=""></ex-user-input>'
    )
    _$compile_(elem)(_$rootScope_.$new())
    _$rootScope_.$digest()

    controller = elem.controller('exUserInput')
    scope = elem.isolateScope() || elem.scope()
  }))

  it('has an input with a Username placeholder', () => {
    expect(elem.find('input')[0].placeholder).toBe('Username')
  })

  it('has a two way binding with input-ctrl.credentials.username', () => {
    expect(elem.find('input')[0].value).toBe('')
    scope.ctrl.credentials.username = 'LEONARDO'
    scope.$digest()
    expect(elem.find('input')[0].value).toBe('LEONARDO')
  })

  it('calls onGetReposClick with {username: ctrl.credentials.username}', () => {
    scope.ctrl.credentials.username = 'LEONARDO'
    scope.$digest()
    const onGetReposClick = (username) => {
      expect(username).toEqual({ username: 'LEONARDO' })
    }

    scope.ctrl.onGetReposClick = onGetReposClick
    elem.find('button').triggerHandler('click')
  })

  it('does not call onGetReposClick with input empty', () => {
    expect(elem.find('input')[0].value).toBe('')
    const onGetReposClick = (username) => {
      expect(true).toBe(false)
    }

    scope.ctrl.onGetReposClick = onGetReposClick
    elem.find('button').triggerHandler('click')
  })
})
