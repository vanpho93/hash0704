const express = require('express');
const session = require('express-session');
const User = require('./model/User');

const requireSignIn = (req, res, next) => {
    if (!req.session.daDangNhap) return res.redirect('/public');
    next();
}

const redirectIfSignedIn = (req, res, next) => {
    if (req.session.daDangNhap) return res.redirect('/public');
    next();
}

const parser = require('body-parser').urlencoded({ extended: false});
const app = express();
app.listen(3000, () => console.log('Server started'))
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'ydg38hefqdj',
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.get('/', (req, res) => res.render('home'));

app.get('/dangky', redirectIfSignedIn, (req, res) => res.render('dangky'));
app.post('/dangky', parser, redirectIfSignedIn, (req, res) => {
    const { email, password, name, phone } = req.body;
    const user = new User(email, password, name, phone);
    user.signUp(err => {
        if (err) return res.send('Email da ton tai, dang ky that bai');
        res.send('Dang ky thanh cong');
    });
});

app.get('/dangnhap', redirectIfSignedIn, (req, res) => {
    res.render('dangnhap');
});

app.post('/dangnhap', parser, redirectIfSignedIn, (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password);
    user.signIn(err => {
        if (err) return res.send(err);
        req.session.daDangNhap = true;
        res.send('Dang nhap thanh cong');
    });
});

app.get('/public', (req, res) => {
    res.send('PUBLIC ROUTE');
});

app.get('/private', requireSignIn, (req, res) => {
    res.send('PRIVATE ROUTE');
});

