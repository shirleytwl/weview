/**
 * ===========================================
 * Configurations
 * ===========================================
 */
const pg = require('pg');
const url = require('url');

var configs;

if (process.env.DATABASE_URL) {

	const params = url.parse(process.env.DATABASE_URL);
	const auth = params.auth.split(':');

	configs = {
		user: auth[0],
		password: auth[1],
		host: params.hostname,
		port: params.port,
		database: params.pathname.split('/')[1],
		ssl: true
	};

} else {
	configs = {
		user: 'shirleytan',
		host: '127.0.0.1',
		database: 'weview_db',
		port: 5432
	};
}


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
	console.log('idle client error', err.message, err.stack);
});


/**
 * ===========================================
 * Require Model Files
 * ===========================================
 */
const allUserModelsFunction = require('./models/user');
const allChannelModelsFunction = require('./models/channel');
const allReviewModelsFunction = require('./models/review');

const userModelsObject = allUserModelsFunction(pool);
const channelModelsObject = allChannelModelsFunction(pool);
const reviewModelsObject = allReviewModelsFunction(pool);


/**
 * ===========================================
 * Module Exports
 * ===========================================
 */
module.exports = {
	queryInterface: (text, params, callback) => {
		return pool.query(text, params, callback);
	},
	pool: pool,
	user: userModelsObject,
	channel: channelModelsObject,
	review: reviewModelsObject
};