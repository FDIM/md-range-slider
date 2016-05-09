"use strict";

describe('module', function()
{
  var _GreetingService;

  beforeEach(module('ngModule'));

  beforeEach(inject(function($injector)
  {
    _GreetingService = $injector.get('GreetingService');
  }));

  describe('sayHello', function()
  {
    it('should call the say hello function', function()
    {
      spyOn(_GreetingService, 'sayHello').and.callFake(angular.noop);

      _GreetingService.sayHello();

      expect(_GreetingService.sayHello).toHaveBeenCalled();
    });

    it('should say hello', function()
    {
        expect(_GreetingService.sayHello()).toEqual("hello there!");
    });
  });
});
