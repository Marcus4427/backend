const express = require('express');

const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/login", (req, res)=> {
    const { username, password } = req.body;

    if (username === "marcus.williann@iesb.edu.br" &&
      password === "08112000"){
        const payload = {
          email: username,
          name: "Marcus"
        };
        try{
          res.json({token: auth.gerarToken(payload)});
        } catch (err){
          return res.status(500).json({msg: err.message});
        }
      }
      return res.status(401).json({msg: "Credenciais invalidas"});
});

module.exports = router;
