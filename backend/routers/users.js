const router = require("express").Router();
const jwt = require("jsonwebtoken");
const JWT_SECRT = "KDSL546H54KHDFJH54656G%#%$rR54756TE$%#%4%^$$235G4FDG6854";
let users = require("../models/users.model");
router.get("/", (req, res) => {
  users
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// ------------------------ ROUTER FOR (REGISTER NEW USER)
router.post("/add", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const birthday = req.body.birthday;
  const program1 = 0;
  const program2 = 0;
  const program3 = 0;
  const height = 0;
  const weight = 0;
  const type = "user";
  const newUser = new users({
    name,
    email,
    password,
    birthday,
    program1,
    program2,
    program3,
    height,
    weight,
    type,
  });
  newUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// ------------------------ ROUTER FOR (EDIT USER INFO BY ID )
router.put("/edit/:id", (req, res) => {
  users.findById(req.params.id).then((user) => {
    if (req.body.name != undefined) user.name = req.body.name;
    if (req.body.birthday != undefined) user.name = req.body.birthday;
    if (req.body.height != undefined) user.height = req.body.height;
    if (req.body.weight != undefined) user.weight = req.body.weight;
    if (req.body.program1 != undefined) user.program1 = req.body.program1;
    if (req.body.program2 != undefined) user.program2 = req.body.program2;
    if (req.body.program3 != undefined) user.program3 = req.body.program3;
    user
      .save()
      .then((data) => res.json(data))
      .catch((err) => {
        if (err) throw err;
      });
  });
});

// ------------------------ ROUTER FOR (CHANGE USER PASSWORD BASED ON ID)
router.put("/changePassword/:id", (req, res) => {
  users.findById(req.params.id).then((user) => {
    user.password = req.body.password;

    user
      .save()
      .then((data) => res.json(data))
      .catch((err) => {
        if (err) throw err;
      });
  });
});

// ------------------------ ROUTER FOR (CHECK EMAIL IF EXISTS )
router.post("/checkEmail", (req, res) => {
  users.findOne({ email: req.body.email }, function (err, obj) {
    if (obj == null) res.json(false);
    else res.json(true);
  });
});

// ------------------------ ROUTER FOR (CHECK SIGNIN )
router.post("/checkSignIn", (req, res) => {
  console.log(req.body);
  users.findOne(
    { email: req.body.email, password: req.body.password },
    function (err, obj) {
      if (err) res.json(err);
      if (obj == null) res.json(false);
      else {
        const token = jwt.sign(
          {
            _id: obj._id,
            name: obj.name,
            email: obj.email,
            height: obj.height,
            weight: obj.weight,
            program1: obj.program1,
            program2: obj.program2,
            program3: obj.program3,
          },
          JWT_SECRT
        );
        res.json(token);
      }
    }
  );
});

module.exports = router;
