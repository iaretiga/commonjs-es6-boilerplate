jest.dontMock('../Panda');

describe('Panda', function() {

    var Panda = require('../Panda');

    it('should be happy after eating some bamboo.', function() {
        var panda = new Panda('Alice');
        panda.eat('bamboo');
        expect(panda.getStatus()).toEqual('Alice is a happy panda.');
    });

    it('should be sad after eating some canned tuna.', function() {
        var panda = new Panda('Alice');
        panda.eat('canned tuna');
        expect(panda.getStatus()).toEqual('Alice is a sad panda.');
    });
});
