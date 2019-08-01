const sha256 = require('js-sha256');
const SALT = "sAlT aNd PePpEr";

module.exports = (db) => {

    let addReviewCC = (req, res) => {

    };

    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        addReview: addReviewCC
    };

};