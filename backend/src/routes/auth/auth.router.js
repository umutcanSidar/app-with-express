import express from "express";
import config from "config";
import crypto from "crypto";

import { getToken } from "utils";
import User from "../../models/User";

const route = () => {
  // Router yarat
  const router = new express.Router();
  // Giriş yap;
  router.route("/").post((req, res) => {
    const { email, password } = req.body;
    // Kullanıcıyı bul
    User.findOne({ email: email }).then((user) => {
      // Kullanıcı yoksa;
      if(!user){
        res.status(404).send({
          status: false,
          message: "User not found!"
        })
      }else{
        // Kullanıcı varsa, şifreyi crypto edip kontrol et;
        if(user.password === crypto.createHmac("sha256", config.passSecret).update(password).digest('hex')){
          // Token yarat.
          const token = getToken(user);
          // Kullanıcının son girişini ve token'ı güncelle;
          User.update({email: email}, {
            $set: {
              last_login: new Date(),
              token: token
            }
          }).then(() => {});
          // Token 'ı gönder.
          res.status(200).send({
            status: true,
            token: token
          })

        }else{
          // Şifre veritabanıyla eşleşmiyorsa hata ver;
          res.status(401).send({
            status: false,
            message: "Email or Password is wrong!"
          })
        }
      }
    });
  });
  // Kayıt ol
  router.route("/sign-up").post((req, res) => {
    const { username, password, name, surname, email } = req.body;

    const newUser = new User({
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: crypto
        .createHmac("sha256", config.passSecret)
        .update(password)
        .digest("hex"),
    });
    newUser.save().then(
      (data) => {
        res.status(201).send({
          status: true,
          data: data,
        });
      },
      (err) => {
        res.status(400).send({
          status: false,
          err: err,
        });
      }
    );
  });

  return router;
};

export default {
  route,
  routePrefix: `/${config.version}/auth`,
};
