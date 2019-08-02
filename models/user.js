/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let checkUser = (username, callback) => {

        let query = 'SELECT username FROM Users WHERE LOWER(username) = $1';
        let values = [username.toLowerCase()];
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

    let addUser = (username,password, callback) => {

        let query = 'INSERT INTO Users(username,password) VALUES($1,$2) RETURNING username, id';
        let values = [username,password];
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

    let loginUser = (username,password, callback) => {

        let query = 'SELECT username,id FROM Users WHERE LOWER(username) = $1 AND password = $2';
        let values = [username.toLowerCase(), password];
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

    let getUser = (username, callback) => {

        let query = 'SELECT username,id, TO_CHAR(date_joined :: DATE, \'dd Month yyyy\') AS date_joined FROM Users WHERE LOWER(username) = $1';
        let values = [username.toLowerCase()];
        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        });
    };

    return {
        checkUser,
        addUser,
	    loginUser,
        getUser
    };
};