describe('githubService', () => {
  let githubService
  let $httpBackend
  let $rootScope
  let EVENT

  beforeEach(module('githubRepos'))
  beforeEach(inject(($injector) => {
    githubService = $injector.get('githubService')
    $httpBackend = $injector.get('$httpBackend')
    $rootScope = $injector.get('$rootScope')
    EVENT = $injector.get('EVENT')
  }))

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  })

  it('should be registered', inject((githubService) => {
    expect(githubService).not.toEqual(null)
    expect(githubService.getRepos).not.toEqual(null)
  }))

  describe('getRepos', () => {
    it('should return EVENT.UserFound with repositories when status is 200', (done) => {
      const reposMock = [
        {
          name: 'MyRepo1',
          html_url: 'www.repo1.com',
          filtered_key: 'this will be filtered'
        },
        {
          name: 'MyRepo2',
          html_url: 'www.repo2.com',
          filtered_key: 'this will be filtered',
          filtered_too_key: 'this will be filtered'
        }
      ]
      const reposMockResult = {
        type: EVENT.UserFound,
        repos: reposMock.map((rep) => {
          return {
            name: rep.name,
            href: rep.html_url
          }
        })
      }

      const testRepos = (repos) => {
        expect(repos).toEqual(reposMockResult)
        setTimeout(done, 0)
      }

      $httpBackend
        .whenGET('https://api.github.com/users/someuser/repos')
        .respond(200, reposMock)

      githubService
        .getRepos('someuser')
        .then(testRepos)

      $httpBackend.flush()
    })

    it('should return EVENT.UserNotFound when status is 404', (done) => {
      const mockResult = {
        type: EVENT.UserNotFound,
        repos: null
      }
      const testRepos = (result) => {
        expect(result).toEqual(mockResult)
        setTimeout(done, 0)
      }

      $httpBackend
        .whenGET('https://api.github.com/users/nonexistent/repos')
        .respond(404, null)

      githubService
        .getRepos('nonexistent')
        .then(testRepos)

      $httpBackend.flush()
    })
  })
})
