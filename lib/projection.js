var _ = require('lodash');
var util = require('util');

var proiect = require('proiect');

var Projection = function(pupa, projectionName) {
	proiect.Projection.call(this);
	this._pupa = pupa;
	this._projectionName = projectionName;
	this._groupBy = null;
	this._states = {};
}

util.inherits(Projection, proiect.Projection);



Projection.prototype.groupBy = function(arg) {
	var func = null;
	if(_.isFunction(arg)) {
		func = arg;
	} else if(_.isString(arg) || _.isObject(arg)) {
		func = function(event) { return _.get(event, arg); };
	} else {
		throw new Error('Unable to handle groupBy: ' + arg);
	}

	this._groupBy = func;
	return this;
};

Projection.prototype.groupByKey = function(event) {
	if(this._groupBy) {
		return this._groupBy(event);
	} else {
		return 'all';
	}
}

module.exports = Projection;