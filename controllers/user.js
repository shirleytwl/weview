const sha256 = require('js-sha256');
const SALT = "sAlT aNd PePpEr";

const cloudinary = require('cloudinary');
const cloudinaryConfig = process.env.CLOUDINARY_URL || require("../cloudinary-config.json");
cloudinary.config(cloudinaryConfig);

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
    let editUserCC = (req, res) => {
        if (req.body.newPassword) {
            db.user.checkPassword(req.params.id, (error, callback) => {
                if (callback) {
                    let oldPassword = sha256(SALT+req.body.oldPassword);
                    if (callback.password === oldPassword) {
                        let newPassword = sha256(SALT+req.body.newPassword);
                        db.user.updatePassword(req.params.id, newPassword, (error, callback) => {
                            if (callback) {
                                if (req.body.newImage) {
                                    let dataURI = req.body.newImage;
                                    let uploadStr = dataURI.replace(/(\r\n|\n|\r)/gm, "");
                                    cloudinary.v2.uploader.upload(uploadStr,{ eager: [{width: 240, height: 240, crop: "fill"}]},
                                        function (error, result) {
                                            let imageUrl = result.eager[0].secure_url;
                                            db.user.updateImage(req.params.id, imageUrl, (error, callback) => {
                                                if (callback) {
                                                    res.status(200).send();
                                                } else {
                                                    res.status(204).send();
                                                }
                                            });
                                        });
                                }
                                else {
                                    res.status(200).send();
                                }
                            } else {
                                res.status(204).send();
                            }
                        });
                    }
                    else {
                        res.status(203).send();
                    }
                } else {
                    res.status(204).send();
                }
            });

        }
        else {
            if (req.body.newImage) {
                let dataURI = req.body.newImage;
                let uploadStr = dataURI.replace(/(\r\n|\n|\r)/gm, "");
                cloudinary.v2.uploader.upload(uploadStr,{ eager: [{width: 240, height: 240, crop: "fill"}]},
                    function (error, result) {
                        let imageUrl = result.eager[0].secure_url;
                        db.user.updateImage(req.params.id, imageUrl, (error, callback) => {
                            if (callback) {
                                res.status(200).send();
                            } else {
                                res.status(204).send();
                            }
                        });
                    });
            }
        }
    };
    let deleteUserCC = (req, res) => {
        db.user.checkPassword(req.params.id, (error, callback) => {
            if (callback) {
                let password = sha256(SALT+req.body.password);
                if (callback.password === password) {
                    db.user.deleteUser(req.cookies['userid'], (error, callback) => {
                        if (callback) {
                            res.status(200).send();
                        } else {
                            res.status(204).send();
                        }
                    });
                }
                else {
                    res.status(203).send();
                }
            } else {
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

    let showUserInfoCC = (req, res) => {
        let user = req.params.id;
        db.user.getUser(user,(error, callback) => {
            if (callback) {
                res.send(callback);
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
        editUser: editUserCC,
        deleteUser: deleteUserCC,
        showUser: showUserCC,
        login: loginCC,
        showUserInfo: showUserInfoCC
    };

};