const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "usuarios",
});

app.use(express.json());
app.use(cors());

app.post("/cadastro", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuario WHERE email = ?", [email],
        (req, result) => {
            if (err) {
                res.send(err);
            }
            if (result.length == 0) {
                db.query("INSERT INTO usuario (email, password) VALUES (?, ?)",
                    [email, password], (err, response) => {
                        if (err) {
                            res.send(err);
                        }
                        res.send({ msg: "Cadastrado com sucesso." });
                    }
                );
            } else {
                res.send({ msg: "Email já cadastrado" });
            }
        });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?",
        [email], (err, result) => {
            if (err) {
                req.send(err);
            }
            if (result.length > 0) {
                res.send({ msg: "Usuário logado" });
            } else {
                res.send({ msg: "Senha incorreta" });
            }
        });
});
app.listen(3001, () => {
    console.log("rodando na porta 3001");
});
