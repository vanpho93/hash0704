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
            VALUES ($1, $2, $3, $4)`;
            queryDB(sql, [this.email, this.password, this.name, this.phone], (err, result) => {
                if (err) return cb(err);
                return cb();
            });
        });
    }

    signIn(cb) {
        const sql = `SELECT * FROM "User" WHERE email = $1`;
        queryDB(sql, [this.email], (err, result) => {
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

    static getAllUser(cb) {
      const sql = `SELECT * FROM "User"`;
      queryDB(sql, [], (err, result) => {
          cb(result.rows);
      });
    }
}

module.exports = User;
