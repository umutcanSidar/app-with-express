import jwt from "jsonwebtoken";
import config from "config";

// 'Kullanıcı' bilgilerini kullanarak token yarat
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    },
    config.jwtSecret,
    {
      expiresIn: "48h",
    }
  );
};

const isAuth = (req, res, next) => {
  // kullanıcıdan gelen isteğin headers kısmından token alınır.
  const token = req.headers.authorization;
  // Token var mı?
  if (token) {
    const onlyToken = token.slice(7, token.lenght); // Gelen token parçalanarak alınır.
    // Decode edilerek kontrol edilir.
    jwt.verify(onlyToken, config.jwtSecret, (err, decode) => {
      if (err) {
        // Bir hata ile karşışırsa;
        return res.status(401).send({ message: "Invalid Token" });
      } else {
        // Token decode edildikten sonra 'req.user' değişkenine atanır.
        req.user = decode;
        // next diyerek middleware'den çıkılır.
        next();
        return;
      }
    });
  } else {
    // Token yoksa;
    return res.status(401).send({ message: "Token is not supplied." });
  }
};

export { isAuth, getToken };
