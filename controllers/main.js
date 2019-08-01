const sha256 = require('js-sha256');
const SALT = "sAlT aNd PePpEr";

module.exports = (db) => {

    let homePageCC = (req, res) => {
        let loginSession = req.cookies["logged_in"];
        let username = req.cookies["username"];
        db.channel.getCategories((error, callback) => {
            let categories = callback;
            if (!loginSession || loginSession === sha256("logged out" + SALT)) {
                res.render("home", {username: null,categories})
            } else {
                res.render('home', {username,categories});
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

    return {
        homePage: homePageCC,
        registerPage: registerPageCC,
        loginPage: loginPageCC,
        logoutPage: logoutPageCC
    };

};
