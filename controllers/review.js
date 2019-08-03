const sha256 = require('js-sha256');
const SALT = "sAlT aNd PePpEr";

module.exports = (db) => {

    let addReviewCC = (req, res) => {

    };
    let showEditReviewCC = (req, res) => {
        db.review.getReview(req.params.id, (error, callback) => {
            if (callback) {
                let review = callback[0];
                db.channel.getCategoriesByChannel(review.channel_id, (error, callback) => {
                    if (callback) {
                        review.categories = callback;
                        res.send(review);
                    }
                })
            }
        });
    };
    let editReviewCC = (req, res) => {
        db.review.editReview(req.params.id,req.body.review,req.body.rating, (error, callback) => {
            if (callback) {
                res.status(200).send();
            }
            else {
                res.status(204).send();}
            }
        )
    };

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        addReview: addReviewCC,
        showEditReview: showEditReviewCC,
        editReview: editReviewCC
    };

};