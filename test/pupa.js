var should = require('should');

var Pupa = require('..');
describe('Pupa', function() {
	it('should throw if projection which do not exist is accessed', function() {
		var pupa = new Pupa();
		pupa.projections('test').should.be.ok;
	});
	it('should return projection after previously created it', function() {
		var pupa = new Pupa();
		pupa.createProjection('test').should.equal(pupa.projections('test'));
	});
});