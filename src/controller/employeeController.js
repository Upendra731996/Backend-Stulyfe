const connection = require("../../config/dbConnection");
// const admin = require("../middleware/firebase");
var admin = require("firebase-admin");
const bcrypt = require("bcrypt");
require("dotenv").config();
const valid = require("../middleware/validation");

// 
const firebase = require('firebase/app');
require('firebase/auth');

module.exports = {
  register: async function (req, res) {
    try {
      let { email, password, name, salary, role, department } = req.body;

      if (!email || !valid.validateEmail(email)) {
        return res.status(400).json({
          data: {},
          msg: "correct email is mandatry for regiteration",
        });
      }
      if (!name || !valid.validateString(name)) {
        return res.status(400).json({
          data: {},
          msg: "name is mandatry in string formate for registeration",
        });
      }

      if (!department || !valid.validateString(department)) {
        return res.status(400).json({
          data: {},
          msg: "deparment is mandatry in string formate for registeration",
        });
      }
      if (!role || !valid.validateString(role)) {
        return res.status(400).json({
          data: {},
          msg: "role is mandatry in string formate for registeration ",
        });
      }
      if (!salary || !valid.validateNumber(salary)) {
        return res.status(400).json({
          data: {},
          msg: "salary is mandatry in number formate for registeration",
        });
      }
      if (!password || password.length < 6) {
        return res.status(400).json({
          data: {},
          msg: "password is mandatry minimum 6 charecter for registeration",
        });
      }

      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
      });

      password = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));

      const sql =
        "INSERT INTO employees (name, role, department, salary,email,password) VALUES (?, ?, ?, ?,?,?)";
      const insertValues = [name, role, department, salary, email, password];

      connection.query(sql, insertValues, async (err, result) => {
        if (err) {
          console.error("Error inserting employee:=============", err);
          return res.json({ statusCode: 500, data: {}, msg: err.message });
        }

        const EmployeeId = result.insertId;

        const token = await admin
          .auth()
          .createCustomToken(userRecord.uid, { id: EmployeeId });
        return res.json({
          statusCode: 201,
          token: token,
          msg: "User registered and logged in successfully",
        });
      });
    } catch (err) {
      console.error("Error registering user:", err);
      return res.json({ statusCode: 500, data: {}, msg: err.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !valid.validateEmail(email)) {
        return res.status(400).json({
          data: {},
          msg: "correct email is mandatry for login",
        });
      }

      if (!password || password.length < 6) {
        return res.status(400).json({
          data: {},
          msg: "password is mandatry  minimum 6 charecter for login",
        });
      }
      var id;
      let sql = `select password,id from employees where email=?`;

      connection.query(sql, [email], async function (err, result) {
        if (err) {
          return res.status(500).json({ data: {}, msg: err.message });
        }

        console.log(result[0]?.password);
        if (!result?.length) {
          return res.status(401).json({ data: {}, mag: "employee not foun" });
        } else {
          id = result[0]?.id;
          bcrypt.compare(
            password,
            result[0]?.password,

            async function (err, checkPassword) {
              if (err) {
                return res.status(500).json({ data: {}, msg: err.message });
              } else {
                if (checkPassword == false) {
                  return res.status(401).json({
                    data: {},
                    msg: "please provide the corect email or password",
                  });
                } else {
                  const user = await admin.auth().getUserByEmail(email);
                  const token = await admin
                    .auth()
                    .createCustomToken(user.uid, { id: id });

                  if (token) {
                    return res.status(200).json({
                      token: token,
                      msg: "user logedin success fully",
                    });
                  }
                }
              }
            }
          );
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getAllEmployees: async function (req, res) {
    try {
      let sql = "select id, name,salary role, department from employees";

      connection.query(sql, function (err, result) {
        if (err) {
          return res.status(500).json({ data: {}, msg: err.message });
        } else {
          return res
            .status(200)
            .json({ data: result, msg: "got All employees succusse fully" });
        }
      });
    } catch (err) {
      return res.status(500).json({ data: {}, msg: err.message });
    }
  },
  getEmployee: async function (req, res) {
    try {
      let id = req.params.id
      if (!id) {
        return res
          .status(401)
          .json({ data: {}, msg: "id is mandatory for get the details" });
      }
      let sql =
        "select id, name,salary role, department  from employees where id=?";
      connection.query(sql, [id], function (err, result) {
        if (err) {
          return res.status(500).json({ data: {}, msg: err.message });
        } else {
          return res
            .status(200)
            .json({ data: result, msg: "get employee succusse fully" });
        }
      });
    } catch (err) {
      return res.status(500).json({ data: {}, msg: err.message });
    }
  },

  addEmployee: async (req, res) => {
    try {
      let { name, salary, role, department } = req.body;

      if (!name || !valid.validateString(name)) {
        return res.status(400).json({
          data: {},
          msg: "name is mandatry in string formate for new Employee",
        });
      }

      if (!department || !valid.validateString(department)) {
        return res.status(400).json({
          data: {},
          msg: "deparment is mandatry in string formate for  new Employee",
        });
      }
      if (!role || !valid.validateString(role)) {
        return res.status(400).json({
          data: {},
          msg: "role is mandatry in string formate for  new Employee ",
        });
      }
      if (!salary || !valid.validateNumber(salary)) {
        return res.status(400).json({
          data: {},
          msg: "salary is mandatry in number formate for  new Employee",
        });
      }

      const sql =
        "insert into employees (name, role, department, salary) values (?,?,?,?)";

      const insertValues = [name, role, department, salary];

      connection.query(sql, insertValues, async (err, result) => {
        if (err) {
          return res.status(500).json({ data: {}, msg: err.message });
        } else {
          return res
            .status(201)
            .json({ data: result, msg: "succese fully add employee" });
        }
      });
    } catch (err) {
      return res.status.json({});
    }
  },

  updateEmployee: async function (req, res) {
    try {
      let id = req.params.id
      const { name, department, salary, role } = req.body;

      let fieldsToUpdate = [];
      let values = [];
      if (!id) {
        return res
          .status(401)
          .json({ data: {}, msg: "id is mandatory for get the update" });
      }
      if (name) {
        fieldsToUpdate.push("name = ?");
        values.push(name);
      }
      if (department) {
        fieldsToUpdate.push("department = ?");
        values.push(department);
      }
      if (salary) {
        fieldsToUpdate.push("salary = ?");
        values.push(salary);
      }
      if (role) {
        fieldsToUpdate.push("role = ?");
        values.push(role);
      }

      if (fieldsToUpdate.length === 0) {
        return res.status(400).json({ msg: "No fields to update" });
      }

      values.push(id);
      // Add the id to the values array for the WHERE clause
      const sql = `UPDATE employees SET ${fieldsToUpdate.join(
        ", "
      )} WHERE id = ?`;

      connection.query(sql, values, function (err, result) {
        if (err) {
          return res.status(500).json({ data: "", msg: err.message });
        } else {
          if (result.affectedRows > 0) {
            return res
              .status(200)
              .json({ data: result, msg: "Employee updated successfully" });
          } else {
            return res
              .status(404)
              .json({ data: "", msg: "Employee not found" });
          }
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteEmployee: async function (req, res) {
    try {
      let id = req.params.id
      let email;
      if (!id) {
        return res
          .status(401)
          .json({ data: {}, msg: "id is mandatory for get the details" });
      }

// find the email with help of id
let sql1="select email from employees where id=?"
connection.query(sql1, [id], function (err, result) {
  if (err) {
    return res.status(500).json({ data: "", msg: err.message });
  } 
  if(result[0]?.email)
   {
   email= result[0].email
  }
 
});
// ===



    if(email){
      const userRecord = await admin
      .auth()
      .getUserByEmail(email);

    await admin.auth().deleteUser(userRecord.uid);
    }

      let sql = `delete from employees where id=?`;
      connection.query(sql, [id], function (err, result) {
        if (err) {
          return res.status(500).json({ data: "", msg: err.message });
        } else {
          return res
            .status(200)
            .json({ data: {}, msg: "deleted employee succusse fully" });
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

   
};
