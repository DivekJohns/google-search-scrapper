const scrapRoutes = require('./scrap-routes');
module.exports = (app) => {
	app.use(process.env.APIVERSION, 
		scrapRoutes);
};