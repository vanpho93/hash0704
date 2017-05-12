const queryDB = require('../db');

class User {
    constructor(email, password, name, phone, id) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.id = id;
    }

    signUp(cb) {
        const sql = `INSERT INTO public."User"(
        email, password, name, phone)
        VALUES ('${this.email}', '${this.password}', '${this.name}', '${this.phone}')`;
        queryDB(sql, (err, result) => {
            if (err) return cb(err);
            return cb();
        });
    }
}

module.exports = User;
