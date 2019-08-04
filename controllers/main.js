const sha256 = require('js-sha256');
const SALT = "sAlT aNd PePpEr";

module.exports = (db) => {

    let homePageCC = (req, res) => {
        let loginSession = req.cookies["logged_in"];
        let username = req.cookies["username"];
        db.channel.getCategories((error, callback) => {
            if (callback) {
                let categories = callback;

                let processed = 0;
                categories.forEach(function (category, index) {
                    db.channel.getChannelsByCategory(category.id,'',3, (error, callback) => {

                        if (callback) {
                            categories[index].channels = callback;
                        }
                        else {
                            categories[index].channels = null;
                        }

                        if (processed >= categories.length - 1) {
                            if (!loginSession || loginSession === sha256("logged out" + SALT)) {
                                res.render("home", {username: null, categories})
                            } else {
                                res.render('home', {username, categories});
                            }
                        }
                        processed++;
                    });
                });
            }
            else {
                if (!loginSession || loginSession === sha256("logged out" + SALT)) {
                    res.render("home", {username: null, categories:null})
                } else {
                    res.render('home', {username, categories: null});
                }
            }
        });

    };

    let registerPageCC = (req, res) => {
        let loginSession = req.cookies["logged_in"];
        (!loginSession || loginSession === sha256("logged out" + SALT)) ? res.render("register"): res.redirect('/');
    };

    let loginPageCC = (req, res) => {
        let loginSession = req.cookies["logged_in"];
        (!loginSession || loginSession === sha256("logged out" + SALT)) ? res.render("login"): res.redirect('/');
    };

    let logoutPageCC = (req, res) => {
        res.cookie('logged_in', sha256("logged out" + SALT));
        res.cookie('username', "");
        res.cookie('userid', "");
        res.redirect('/');
    };

    let getCategoriesCC = (req, res) => {
        db.channel.getCategories((error, callback) => {
            if (callback) {
                let categories = callback;
            }
        });
    };

    return {
        homePage: homePageCC,
        registerPage: registerPageCC,
        loginPage: loginPageCC,
        logoutPage: logoutPageCC,
        getCategories: getCategoriesCC
    };

};
