/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope
    let addReview = (review,user_id,channel_id,rating, callback) => {
        let query = 'INSERT INTO Reviews (content, date_created, date_edited, user_id, channel_id, edited,rating) SELECT $1, NOW(), NOW(),$2,$3,false,$4 WHERE NOT EXISTS (SELECT 1 FROM Reviews WHERE user_id=$5 and channel_id=$6 ) RETURNING id';
        let values = [review,user_id,channel_id,rating,user_id,channel_id];
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
        let query = 'SELECT reviews.id, reviews.content, TO_CHAR(reviews.date_created :: DATE, \'dd Month yyyy\') AS date_created, TO_CHAR(reviews.date_edited :: DATE, \'dd Month yyyy\') AS date_edited, edited, Users.id, Users.username FROM Reviews INNER JOIN Users ON (Reviews.user_id=Users.id) WHERE $1=channel_id';
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

    let getReviewsByUser = (user_id, callback) => {
        let query = 'SELECT reviews.id, reviews.content, TO_CHAR(reviews.date_created :: DATE, \'dd Month yyyy\') AS date_created, TO_CHAR(date_edited :: DATE, \'dd Month yyyy\') AS date_edited, channels.name, channels.youtube_id, channels.link, channels.thumbnail_url FROM Reviews INNER JOIN Channels ON (Reviews.channel_id=Channels.id) WHERE $1=user_id';
        let values = [user_id];
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
        getReviewsByChannel,
        getReviewsByUser
    };
};