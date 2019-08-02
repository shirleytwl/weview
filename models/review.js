/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope
    let addReview = (review,user_id,channel_id, callback) => {
        let query = 'INSERT INTO Reviews (content, date_created, date_edited, user_id, channel_id) SELECT $1, NOW(), NOW(),$2,$3 WHERE NOT EXISTS (SELECT 1 FROM Reviews WHERE user_id=$4 and channel_id=$5 ) RETURNING id';
        let values = [review,user_id,channel_id,user_id,channel_id];
        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0].id);
                } else {
                    callback(null, null);
                }
            }
        });
    };

    let getReviewsByChannel = (channel_id, callback) => {
        let query = 'SELECT * FROM Reviews INNER JOIN Users ON (Reviews.user_id=Users.id) WHERE $1=channel_id';
        // let query = 'SELECT * FROM Channel_Categories INNER JOIN Categories ON (Categories.id=Channel_Categories.category_id) WHERE $1=Channel_Categories.channel_id';

        let values = [channel_id];
        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    };

    return {
        addReview,
        getReviewsByChannel
    };
};