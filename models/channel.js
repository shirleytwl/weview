/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
    let addChannel = (channel_info, callback) => {
        let query = 'WITH S AS ( SELECT id FROM Channels WHERE youtube_id = $1), I AS ( INSERT INTO Channels (name, youtube_id, thumbnail_url, link) SELECT $2,$3,$4,$5 WHERE NOT EXISTS (SELECT 1 FROM S) RETURNING id) SELECT id FROM I UNION ALL SELECT id FROM S;';
        let values = [channel_info.id,channel_info.name,channel_info.id,channel_info.thumbnail,channel_info.link];
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
        let query = 'WITH S AS ( SELECT id FROM Categories WHERE LOWER(name)=$1), I AS ( INSERT INTO Categories (name) SELECT $2 WHERE NOT EXISTS (SELECT 1 FROM S) RETURNING id) SELECT id FROM I UNION ALL SELECT id FROM S;';
        let values = [name.toLowerCase(),name];
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
        let query = 'INSERT INTO Channel_Categories(channel_id,category_id) SELECT $1,$2 WHERE NOT EXISTS (SELECT 1 FROM Channel_Categories WHERE channel_id=$3 AND category_id = $4)';
        let values = [channel_id,category_id,channel_id,category_id];
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
        let query = 'SELECT name FROM Categories';
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

    return {
        addChannel,
        addCategory,
        addChannelCategory,
        getCategories
    };
};