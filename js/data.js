'use strict';
// The below is to stop jshint barking at defined but never used variables
/* exported tmData */
/* globals API_BASE_URL */

var tmData = {
	getTrackInfo: function (successCallback) {
		// $.getJSON('config/layers.json', f).fail(function(jqxhr, textStatus, error) {throw error});
		$.getJSON(API_BASE_URL + '/v1/tracks', successCallback).fail(function(jqxhr, textStatus, error) {throw error;});
	},
	getGeoTags: function (tId, successCallback, errorCallback) {
		// $.getJSON('data/' + tId + '/photos/geotags.json', successCallback).fail(function(jqxhr, textStatus, error) {throw error;});
		$.getJSON(API_BASE_URL + '/v1/tracks/' + tId + '/geotags/', successCallback).fail(errorCallback);
	},
	getMotd: function (successCallback) {
		// $.getJSON('data/motd.json', successCallback).fail(function(jqxhr, textStatus, error) {throw error;});
		$.getJSON(API_BASE_URL + '/v1/motd', successCallback).fail(function(jqxhr, textStatus, error) {throw error;});
	},
	getJWTToken: function (username, password, successCallback, errorCallback) {
		// $.getJSON(API_BASE_URL + '/v1/token', successCallback).fail(errorCallback);
		$.ajax({
			url: API_BASE_URL + '/v1/token',
			type: 'GET',
			headers: {
				'Authorization': 'Basic ' + btoa(username + ':' + password)
			 },
			success: successCallback,
			error: errorCallback
		});
	},
	registerUser: function (reg, successCallback, errorCallback) {
		// $.getJSON(API_BASE_URL + '/v1/token', successCallback).fail(errorCallback);
		console.log(reg);
		$.ajax({
			url: API_BASE_URL + '/v1/users',
			type: 'POST',
			data: JSON.stringify(reg),
			contentType: 'application/json; charset=utf-8',
			success: successCallback,
			error: errorCallback
		});
	},
	updateUserProfile: function (reg, token, successCallback, errorCallback) {
		// $.getJSON(API_BASE_URL + '/v1/token', successCallback).fail(errorCallback);
		console.log(reg);
		$.ajax({
			url: API_BASE_URL + '/v1/users/me',
			type: 'PUT',
			headers: {
				'Authorization': 'JWT ' + token
			 },
			data: JSON.stringify(reg),
			contentType: 'application/json; charset=utf-8',
			success: successCallback,
			error: errorCallback
		});
	},
	addTrack: function (trk, token, successCallback, errorCallback) {
		console.log(trk);
		$.ajax({
			url: API_BASE_URL + '/v1/tracks',
			type: 'POST',
			headers: {
				'Authorization': 'JWT ' + token
			 },
			data: JSON.stringify(trk),
			contentType: 'application/json; charset=utf-8',
			success: successCallback,
			error: errorCallback
		});
	},
	uploadTrackPic: function (file, tId, picIndex, token, successCallback, errorCallback) {
		console.log('picture upload ', tId, picIndex);
		$.ajax({
			url: API_BASE_URL + '/v1/tracks/' + tId + '/' + 'picture/' + picIndex,
			type: 'POST',
			headers: {
				'Authorization': 'JWT ' + token
			 },
			data: file,
			processData: false,
			contentType: 'image/jpeg',
			success: successCallback,
			error: errorCallback
		});
	}
};