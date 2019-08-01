module.exports = (db) => {

    let addChannelCC = (req, res) => {
        console.log(req.body);

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
                                    console.log(callback);
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

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        addChannel: addChannelCC
    };

};