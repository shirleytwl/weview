const sha256 = require('js-sha256');
const SALT = "sAlT aNd PePpEr";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const apikey = process.env.API_KEY || require('../api-key.js');

module.exports = (db) => {

    let addChannelCC = (req, res) => {

        db.channel.addChannel(req.body, (error, callback) => {
            if (callback) {
                let channelId = callback;
                req.body.categories.forEach(function (category, index) {
                    db.channel.addCategory(category, (error, callback) => {
                        if (callback) {
                            let categoryId = callback;
                            db.channel.addChannelCategory(channelId, categoryId, (error, callback) => {

                            });

                            if (index === req.body.categories.length - 1) {
                                db.review.addReview(req.body.review,req.cookies["userid"],channelId, (error, callback) => {
                                    if (callback) {
                                        res.status(201).send();
                                    }
                                    else {
                                        res.status(204).send();
                                    }

                                })
                            }
                        }
                    });
                });
            }
        });
    };

    let showChannelCC = (req, res) => {
        let loginSession = req.cookies["logged_in"];
        let username = req.cookies["username"];
        let data = {};
        if (!loginSession || loginSession === sha256("logged out" + SALT)) {
            data = { username: null };
        }
        else {
            data = { username };
        }
        db.channel.getChannel(req.params.id, (error, callback) => {
            if (callback) {
                data.channel = callback[0];
                db.channel.getCategoriesByChannel(data.channel.id,(error, callback) => {
                    if (callback) {
                        data.channel.categories = callback;

                        db.review.getReviewsByChannel(data.channel.id,(error, callback) => {
                            if (callback) {
                                data.channel.reviews = callback;
                                res.render('channel', {data});
                            }
                        });
                    }
                });
            }
            else {
                data.channel = null;
                res.render('channel', {data});
            }

        });
    };

    let getFromYoutubeCC = (req,res) => {
        let youtubeReq = new XMLHttpRequest();   // new HttpRequest instance
        youtubeReq.addEventListener("load", function(){
            res.send(JSON.parse(this.responseText));
        });
        let info = req.params.id;
        if (req.params.type === 'channel') {
            youtubeReq.open("GET", "https://www.googleapis.com/youtube/v3/channels?key=" + apikey.apikey + "&id=" + info + "&part=snippet,topicDetails");
        }
        else if (req.params.type === 'user'){
            youtubeReq.open("GET", "https://www.googleapis.com/youtube/v3/channels?key=" + apikey.apikey + "&forUsername=" + info + "&part=snippet,topicDetails");
        }
        youtubeReq.send();
    };
    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        addChannel: addChannelCC,
        showChannel: showChannelCC,
        getFromYoutube: getFromYoutubeCC

    };

};