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

    return {
        addReview
    };
};