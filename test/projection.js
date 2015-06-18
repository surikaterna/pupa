var should = require('should');

var Pupa = require('..');
describe('Projection', function() {
	it('should throw if projection which do not exist is accessed', function() {
		var pupa = new Pupa();
		var proj = pupa.projections('test');
		proj
			.groupBy('id')
			.init(function(s) {
				s.count=0;
				console.log('init');
			})
			.any(function(s) {
				s.count++;
			});

		pupa.push({id:'12'});
		pupa.push({id:'13'});
		pupa.push({id:'13'});
	});

});