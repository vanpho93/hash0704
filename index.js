const express = require('express');
const User = require('./model/User');

const parser = require('body-parser').urlencoded({ extended: false});
const app = express();
app.listen(3000, () => console.log('Server started'))
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

app.get('/dangky', (req, res) => res.render('dangky'));
app.post('/dangky', parser, (req, res) => {
    const { email, password, name, phone } = req.body;
    const user = new User(email, password, name, phone);
    user.signUp(err => {
        if (err) return res.send('Email da ton tai, dang ky that bai');
        res.send('Dang ky thanh cong');
    });
});

app.get('/dangnhap', (req, res) => res.render('dangnhap'));
app.post('/dangnhap', parser, (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password);
    user.signIn(err => {
        if (err) return res.send(err);
        res.send('Dang nhap thanh cong');
    });
});