let fs = require("fs");
let path = require("path");
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
// set the view engine to ejs

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Require static assets from public folder
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/catalog", function(req, res) {
  var data = fs.readFileSync("flowers.json", "utf8");
  var flowers = JSON.parse(data);
  res.render("catalog", { flowers: flowers });
});

app.get("/branches", function(req, res) {
  var data = fs.readFileSync("branches.json", "utf8");
  var branches = JSON.parse(data);
  res.render("branches", { branches: branches });
});

app.get("/userManage", function(req, res) {
  var data = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(data);
  res.render("userManage", { users: users });
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.post("/login", function(req, res) {
  var user = req.body.userName;
  var passw = req.body.passw;
  var data = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(data);
  let exist = 0;
  for (i = 0; i < users.length; i++)
    if (users[i].userName == user && users[i].pass == passw) exist = 1;

  if (exist == 1) res.status(200).send();
  else res.status(404).send();
});

app.get("/nav", function(req, res) {
  var user = req.query.userName;
  var cate = checkCategory(user);
  switch (cate) {
    case "user":
      res.render("partials/user_nav");
      break;
    case "manage":
      res.render("partials/manage_nav");
      break;
    case "employee":
      res.render("partials/employee_nav");
      break;
    case "supplier":
      res.render("partials/user_nav");
      break;
    default:
      res.render("partials/header");
      break;
  }
});

function checkCategory(usr) {
  var data = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(data);

  for (i = 0; i < users.length; i++) {
    if (users[i].userName == usr) var category = users[i].category;
  }
  return category;
}

app.get("/getData", function(req, res) {
  var user = req.query.userName;
  let exist = 0;
  usr = new Array(7);
  var data = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(data);
  console.log(user);
  for (i = 0; i < users.length; i++) {
    if (users[i].userName == user) {
      usr[0] = user;
      usr[1] = users[i].pass;
      usr[2] = users[i].gender;
      usr[3] = users[i].id;
      usr[4] = users[i].address;
      usr[5] = users[i].category;
      usr[6] = users[i].idB;
      exist = 1;
    }
  }
  if (exist == 1)
    res.status(200).send({
      userName: usr[0],
      pass: usr[1],
      gender: usr[2],
      id: usr[3],
      address: usr[4],
      category: usr[5],
      idB: usr[6]
    });
  else res.status(404).send();
});

app.post("/del", function(req, res) {
  var user = req.body.usr;
  var data = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(data);
  console.log(users);
  for (i = 0; i < users.length; i++) {
    if (users[i].userName == user) {
      index = i;
      break;
    }
  }
  if (index !== null) {
    users.splice(index, 1);
  }
  let x = JSON.stringify(users);
  fs.writeFile("users.json", x, function(err) {
    if (err) throw err;
  });
  res.status(200).send();
});

app.post("/add", function(req, res) {
  var userN = req.body.userName;
  var data = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(data);
  let exist = 0;
  for (i = 0; i < users.length; i++) {
    if (users[i].userName == userN) exist = 1;
  }
  if (exist == 1) res.status(404).send();
  else {
    user = {
      userName: req.body.userName,
      pass: req.body.pass,
      gender: req.body.gender,
      id: req.body.id,
      address: req.body.address,
      category: req.body.category,
      idB: req.body.idB
    };
    if (user != null) users.splice(0, 0, user);
  }
  let x = JSON.stringify(users);
  fs.writeFile("users.json", x, function(err) {
    if (err) throw err;
  });
  res.status(200).send();
});

app.post("/edit", function(req, res) {
  var userN = req.body.userName;
  var user;
  var data = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(data);
  let exist = 0;
  for (i = 0; i < users.length; i++) {
    if (users[i].userName == userN) {
      exist = 1;
      ind = i;
      user = {
        userName: userN,
        pass: req.body.pass,
        gender: req.body.gender,
        id: req.body.id,
        address: req.body.address,
        category: req.body.category,
        idB: req.body.idB
      };
      break;
    }
  }
  if (exist == 1) {
    users.splice(ind, 1);
    users.splice(0, 0, user);
    let x = JSON.stringify(users);
    fs.writeFile("users.json", x, function(err) {
      if (err) throw err;
    });
    res.status(200).send();
  } else res.status(404).send();
});

app.listen(8001, function() {
  console.log("Listening on port 8001!");
});
