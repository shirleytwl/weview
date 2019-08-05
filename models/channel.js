/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    let addChannel = (channel_info, callback) => {
        let query = 'WITH S AS ( SELECT id FROM Channels WHERE youtube_id = $1), I AS ( INSERT INTO Channels (name, youtube_id, thumbnail_url, link) SELECT $2,$3,$4,$5 WHERE NOT EXISTS (SELECT 1 FROM S) RETURNING id) SELECT id FROM I UNION ALL SELECT id FROM S;';
        let values = [channel_info.id,channel_info.name,channel_info.id,channel_info.thumbnail,'https://www.youtube.com/channel/'+channel_info.id];
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

    let addCategory = (name, callback) => {
        let query = 'WITH S AS ( SELECT id FROM Categories WHERE LOWER(name)=LOWER($1)), I AS ( INSERT INTO Categories (name) SELECT $1 WHERE NOT EXISTS (SELECT 1 FROM S) RETURNING id) SELECT id FROM I UNION ALL SELECT id FROM S;';
        let values = [name];
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

    let addChannelCategory = (channel_id,category_id, callback) => {
        let query = 'INSERT INTO Channel_Categories(channel_id,category_id) SELECT $1,$2 WHERE NOT EXISTS (SELECT 1 FROM Channel_Categories WHERE channel_id=$1 AND category_id = $2)';
        let values = [channel_id,category_id];
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

    let getCategories = (callback) => {
        let query = 'SELECT * FROM Categories ORDER BY name ASC';
        dbPoolInstance.query(query, (error, queryResult) => {
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

    let getCategory = (category_id,callback) => {
        let query = 'SELECT * FROM Categories WHERE $1 = id';
        let values = [category_id];
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

    let getChannel = (id, callback) => {
        let query = 'SELECT *, (SELECT ROUND(AVG(rating), 1) FROM Reviews WHERE Reviews.channel_id = Channels.id) AS rating, (SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id) AS numReviews FROM Channels WHERE youtube_id = $1';
        let values = [id];
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

    let getChannelsByCategory = (category_id, sortby, limit, callback) => {
        let query = 'SELECT *, (SELECT ROUND(AVG(rating), 1) FROM Reviews WHERE Reviews.channel_id = Channels.id) AS rating, (SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id) AS numReviews FROM Channel_Categories INNER JOIN Channels ON (Channels.id=Channel_Categories.channel_id) WHERE $1=Channel_Categories.category_id AND ( SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id ) > 0 ORDER BY rating DESC, Channels.name ASC';
        if (sortby === 'htl') {
            query = 'SELECT *, (SELECT ROUND(AVG(rating), 1) FROM Reviews WHERE Reviews.channel_id = Channels.id) AS rating, (SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id) AS numReviews FROM Channel_Categories INNER JOIN Channels ON (Channels.id=Channel_Categories.channel_id) WHERE $1=Channel_Categories.category_id AND ( SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id ) > 0 ORDER BY rating DESC, Channels.name ASC';
        }
        else if (sortby === 'lth') {
            query = 'SELECT *, (SELECT ROUND(AVG(rating), 1) FROM Reviews WHERE Reviews.channel_id = Channels.id) AS rating, (SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id) AS numReviews FROM Channel_Categories INNER JOIN Channels ON (Channels.id=Channel_Categories.channel_id) WHERE $1=Channel_Categories.category_id AND ( SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id ) > 0 ORDER BY rating ASC, Channels.name ASC';

        }
        else if (sortby === 'a-z') {
            query = 'SELECT *, (SELECT ROUND(AVG(rating), 1) FROM Reviews WHERE Reviews.channel_id = Channels.id) AS rating, (SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id) AS numReviews FROM Channel_Categories INNER JOIN Channels ON (Channels.id=Channel_Categories.channel_id) WHERE $1=Channel_Categories.category_id AND ( SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id ) > 0 ORDER BY Channels.name ASC, rating DESC';
        }
        else if (sortby === 'z-a') {
            query = 'SELECT *, (SELECT ROUND(AVG(rating), 1) FROM Reviews WHERE Reviews.channel_id = Channels.id) AS rating, (SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id) AS numReviews FROM Channel_Categories INNER JOIN Channels ON (Channels.id=Channel_Categories.channel_id) WHERE $1=Channel_Categories.category_id AND ( SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id ) > 0 ORDER BY Channels.name DESC, rating DESC';
        }
        else if (sortby === 'reviews'){
            query = 'SELECT *, (SELECT ROUND(AVG(rating), 1) FROM Reviews WHERE Reviews.channel_id = Channels.id) AS rating, (SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id) AS numReviews FROM Channel_Categories INNER JOIN Channels ON (Channels.id=Channel_Categories.channel_id) WHERE $1=Channel_Categories.category_id AND ( SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id ) > 0 ORDER BY numReviews DESC,rating DESC,Channels.name ASC';
        }
        let values = [category_id];
        if (limit !== 0) {
        query = 'SELECT *, (SELECT ROUND(AVG(rating), 1) FROM Reviews WHERE Reviews.channel_id = Channels.id) AS rating, (SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id) AS numReviews FROM Channel_Categories INNER JOIN Channels ON (Channels.id=Channel_Categories.channel_id) WHERE $1=Channel_Categories.category_id AND ( SELECT COUNT(id) FROM REVIEWS WHERE Reviews.channel_id = Channels.id ) > 0 ORDER BY rating DESC, Channels.name ASC LIMIT $2';
            values = [category_id,limit]
        }
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

    let getCategoriesByChannel = (channel_id,callback) => {
        let query = 'SELECT * FROM Channel_Categories INNER JOIN Categories ON (Categories.id=Channel_Categories.category_id) WHERE $1=Channel_Categories.channel_id';
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
        addChannel,
        addCategory,
        addChannelCategory,
        getCategories,
        getCategory,
        getChannel,
        getChannelsByCategory,
        getCategoriesByChannel
    };
};