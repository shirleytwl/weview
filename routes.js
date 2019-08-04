module.exports = (app, allModels) => {

	const mainCC = require('./controllers/main')(allModels);
	const userCC = require('./controllers/user')(allModels);
	const channelCC = require('./controllers/channel')(allModels);
	const reviewCC = require('./controllers/review')(allModels);

	app.get('/', mainCC.homePage);
	app.get('/register', mainCC.registerPage);
	app.get('/login', mainCC.loginPage);
	app.get('/logout', mainCC.logoutPage);

	app.get('/channels/:id',channelCC.showChannel);
	app.get('/users/:user',userCC.showUser);
	app.get('/categories/:id',channelCC.showCategoryChannels);


	app.get('/youtube/:type/:id',channelCC.getFromYoutube);

	app.post('/register/user', userCC.checkUser);
	app.post('/register', userCC.addUser);
	app.post('/login', userCC.login);

	app.post('/channel',channelCC.addChannel);
	app.get('/channel-info/:id',channelCC.showChannelInfo);
	app.get('/review/:id',reviewCC.showEditReview);
	app.post('/review/:id',reviewCC.addReview);
	app.put('/review/:id',reviewCC.editReview);
	app.delete('/review/:id',reviewCC.deleteReview);
};