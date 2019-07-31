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
                res.status(200).send();
            }
            else {
                res.status(204).send();
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
        login: loginCC
    };

};