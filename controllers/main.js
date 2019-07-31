module.exports = (db) => {

    let homepageCC = (req, res) => {
        res.render("home");
    };

    return {
        homepage: homepageCC
    };

};
