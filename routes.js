module.exports = (app, allModels) => {

	const mainCC = require('./controllers/main')(allModels);
	const userCC = require('./controllers/user')(allModels);
	const channelCC = require('./controllers/channel')(allModels);

	app.get('/', mainCC.homePage);
	app.get('/register', mainCC.registerPage);
	app.get('/login', mainCC.loginPage);
	app.get('/logout', mainCC.logoutPage);

	app.post('/register/user', userCC.checkUser);
	app.post('/register', userCC.addUser);
	app.post('/login', userCC.login);

	app.post('/review',channelCC.addChannel);
};