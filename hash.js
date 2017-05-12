const { hash, compare } = require('bcrypt');

const a = '123456';

hash(a, 8, (err, hash) => {
    console.log(hash);
});

compare('123456', '$2a$08$FLksYC9sH4su9dzYWwLmukQxvr6ufsVxuAEnfx0jHTDBM6Up2v96',(err, same) => {
    console.log(same);
});