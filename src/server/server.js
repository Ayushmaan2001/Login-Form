const app = require("express")();
const bodyParser = require("body-parser");
const sql = require("mysql");
const core = require("cors");
app.use(core());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var con = sql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "ayush",
});

con.connect((err) => {
  if (err) {
    console.log("NOT");
  } else {
    console.log("connected  heelooo");
  }
});

app.post("/register", (req, res) => {
  const mail = req.body.Email;
  const pass = req.body.Password;
  con.query(
    "INSERT INTO world.sample (Email,Password) VALUES (?,?)",
    [mail, pass],
    (err, result) => {
      if (err) {
        res.send({ err });
      }
      if (result) {
        res.send("Register Successfully");
      } else {
        res.send("Not able to insert");
      }
    }
  );
});

app.post("/login", (req, res) => {
  const mail = req.body.Email;
  const pass = req.body.Password;
  if (mail === null || pass === null) {
    res.send("Wrong Email/Password");
  }
  con.query(
    "SELECT * FROM world.sample WHERE Email = ? and Password = ?",
    [mail, pass],
    (err, result) => {
      if (err) {
        res.send({ err });
      }
      if (result) {
        res.send(result);
      } else {
        res.send("not found");
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Running");
});
