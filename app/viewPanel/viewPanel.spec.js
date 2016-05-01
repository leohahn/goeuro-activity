describe('viewPanel directive', () => {
  let elem, scope, controller

  beforeEach(module('githubRepos'))
  beforeEach(module('templates'))
  beforeEach(inject((_$rootScope_, _$compile_, EVENT) => {
    elem = angular.element(
      '<ex-view-panel type="danger" title="myTitle" description="myDesc"></ex-view-panel>'
    )
    _$compile_(elem)(_$rootScope_.$new())
    _$rootScope_.$digest()

    scope = elem.isolateScope() || elem.scope()
  }))

  it('has a "panel panel-`type` view-panel" class depending on the type', () => {
    const class1 = elem.find('div')[0].className.indexOf('panel-danger')
    expect(class1).not.toBe(-1)

    scope.ctrl.type = 'whatever'
    scope.$digest()
    const class2 = elem.find('div')[0].className.indexOf('panel-whatever')
    expect(class2).not.toBe(-1)
  })
})
