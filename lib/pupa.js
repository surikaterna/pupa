var _ = require('lodash');

var Projection = require('./projection');

var Pupa = function(db, tapeworm) {
	this._db = db;
	this._tapeworm = tapeworm;
	this._projections = {};
}

Pupa.prototype.projections = function(projectionName) {

	var projection = null;
	if(!this._hasProjection(projectionName)) {
		projection = this.createProjection(projectionName);
	} else {
		projection = this._getProjection(projectionName);
	}
	return projection;
};

Pupa.prototype.createProjection = function(projectionName) {
	var projection = this._getProjection(projectionName);
	//if already exists
	if(_.isUndefined(projection)) {
		projection = this._projections[projectionName] = new Projection(this, projectionName);
	}
	return projection;
};

Pupa.prototype._getProjection = function(projectionName) {
	return this._projections[projectionName];
}

Pupa.prototype._hasProjection = function(projectionName) {
	return !_.isUndefined(this._projections[projectionName]);
};

Pupa.prototype.push = function(events) {
	this._states = {};

	var evts = _.isArray(events) ? events : [events];
	_.forEach(this._projections, function pusher(projection) {
		_.forEach(evts, function(event) {
			var key = projection.groupByKey(event);
			var state = projection._states[key];
			if(_.isUndefined(state)) {
				state = projection.project(undefined, event);
				projection._states[key] = state;
			} else {
				projection.project(state, event);
			}
			
			console.log(state);
		});	
	});
};

module.exports = Pupa;