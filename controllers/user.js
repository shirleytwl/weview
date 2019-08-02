const sha256 = require('js-sha256');
const SALT = "sAlT aNd PePpEr";

module.exports = (db) => {

    let checkUserCC = (req,res) => {
        let username = req.body.username;
        db.user.checkUser(username,(error, callback) => {
            res.send(callback);
        });
    };
    let addUserCC = (req, res) => {
        let username = req.body.username;
        let password = sha256(SALT+req.body.password);
        db.user.addUser(username, password,(error, callback) => {
            if (callback) {
                res.cookie('logged_in', sha256(callback[0].username+"logged in"+SALT));
                res.cookie('username', callback[0].username);
                res.cookie('userid', callback[0].id);
                res.status(200).send();
            }
            else {
                res.status(204).send();
            }
        });
    };
    let showUserCC = (req, res) => {
        let loginSession = req.cookies["logged_in"];
        let username = req.cookies["username"];
        let data = {};
        if (!loginSession || loginSession === sha256("logged out" + SALT)) {
            data = { username: null };
        }
        else {
            data = { username };
        }
        let user = req.params.user;
        db.user.getUser(user,(error, callback) => {
            if (callback) {
                data.user = callback;
                db.review.getReviewsByUser(data.user.id,(error, callback) => {
                    if (callback) {
                        data.user.reviews = callback;
                        res.render('user', {data});
                    }
                });
            }
        });
    };
    let loginCC = (req, res) => {
        let username = req.body.username;
        let password = sha256(SALT+req.body.password);
        db.user.loginUser(username, password,(error, callback) => {
            if (callback) {
                res.cookie('logged_in', sha256(callback[0].username + "logged in" + SALT));
                res.cookie('username', callback[0].username);
                res.cookie('userid', callback[0].id);
                res.status(200).send();
            }
            else {
                res.status(204).send();
            }
        });
    };


    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        checkUser: checkUserCC,
        addUser: addUserCC,
        showUser: showUserCC,
        login: loginCC
    };

};