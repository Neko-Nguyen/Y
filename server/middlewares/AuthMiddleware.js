import { storage } from "../helpers/StorageContext";

const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
   const accessToken = req.header(storage);

   if (!accessToken) return res.json({ error: "User not logged in!" });
   try {
      const validToken = verify(accessToken, "important secret");
      req.user = validToken;
      
      if (validToken) return next();
   } catch (err) {
      return res.json({ error: err });
   }
};

module.exports = { validateToken };