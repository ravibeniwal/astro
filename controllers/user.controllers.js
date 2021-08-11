const sendEMail = require("../helpers/sendEMail");
const User = require("../models/user.model");

exports.login = (req, res) => {
  User.find({ email: req.body?.email })
    .then((_loginUser) => {
      if (_loginUser && _loginUser?.length === 0) {
        return res.status(409).json({
          message: "User not Found",
        });
      } else {
        if (req.body?.password === _loginUser[0]?.password) {
          User.updateOne(
            { email: req.body?.email }, // Query parameter
            {
              lastloginDate: new Date(),
            },
            { upsert: true } // Options
          ).catch((data) => {
            console.log("data is here", data);
          });
          res.status(200).json({
            data: _loginUser[0],
            message: "Login successfull",
          });
        } else {
          return res.status(409).json({
            message: "Incorrect Password",
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "authentication failed" });
    });
};

exports.getAllUsers = (req, res) => {
  User.find()
    .then((_AllUsers) => {
      res.status(200).json(_AllUsers);
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Error in fetching" });
    });
};

exports.resetPassword = (req, res) => {
  User.find({ email: req.body?.email })
    .then((_loginUser) => {
      if (_loginUser && _loginUser?.length === 0) {
        return res.status(409).json({
          message: "Email id does not exist",
        });
      } else {
        sendEMail({
          config: {
            from: "ravibeniwal35@gmail.com",
            to: req.body?.email,
          },
          data: {
            subject: "Reset Password Request",
            password: _loginUser.password,
            email: res.body?.email,
            message: `Your password for login ${_loginUser.password}`,
            type: "ResetPassword",
          },
        });

        // send email then
        res.status(200).json({
          data: _loginUser[0],
          message: `Password sent on this email id ${req.body?.email}`,
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err, message: "Error in resetting the password" });
    });
};

exports.deleteUser = (req, res) => {
  User.findOneAndDelete({ email: req.body?.email })
    .then((_user) => {
      console.log("user data is eher", _user);
      if (_user === null) {
        return res
          .status(200)
          .json({ user: _user, message: "No User to delete" });
      } else {
        res
          .status(200)
          .json({ user: _user, message: "User deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Error in deleting" });
    });
};

exports.createUser = (req, res) => {
  // check if user already exist
  User.find({ email: req.body.email })
    .then((_user) => {
      if (_user && _user?.length === 0) {
        // create random password
        var randomPassword = Math.random().toString(36).slice(-8);
        // create user if user does not exist
        const user = new User({
          name: req.body?.name || "",
          imageUrl: req.body?.imageUrl || "",
          email: req.body?.email,
          role: req.body?.admin === true ? "Admin" : "User",
          password: randomPassword,
        });
        user
          .save()
          .then((data) => {
            sendEMail({
              config: {
                from: "ravibeniwal35@gmail.com",
                to: req.body?.email,
              },
              data: {
                subject: "New customer registration",
                password: randomPassword,
                email: res.body?.email,
                message: `Your password for login ${randomPassword}`,
                type: "Registration",
              },
            });
            res.status(200).json(data);
            // send email notification to user if needed
          })
          .catch((err) => {
            res.status(500).json({ message: err });
          });
      } else {
        res.status(409).json({
          message: `User # ${req.body.email} already registered`,
          user: _user,
        });
        // resend invite if user request is to resend invite in that case send email to user of password
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};
