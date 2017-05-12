const { hash, compare } = require('bcrypt');
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
        hash(this.password, 8, (errHash, encypted) => {
            if (errHash) return cb(errHash);
            const sql = `INSERT INTO public."User"(
            email, password, name, phone)
            VALUES ('${this.email}', '${encypted}', '${this.name}', '${this.phone}')`;
            queryDB(sql, (err, result) => {
                if (err) return cb(err);
                return cb();
            });
        });
    }

    signIn(cb) {
        const sql = `SELECT * FROM "User" WHERE email = '${this.email}'`;
        queryDB(sql, (err, result) => {
            if (err) return cb (err);
            if (result.rowCount === 0) return cb('EMAIL KHONG TON TAI');
            const encypted = result.rows[0].password;
            compare(this.password, encypted, (err, same) => {
                if (err) return cb(err)
                if (!same) return cb('PASSWORD KHONG DUNG');
                cb();
            });
        });
    } 
}

module.exports = User;
