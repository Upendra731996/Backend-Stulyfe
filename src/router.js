const router= require('express').Router()
const employeeController= require("./controller/employeeController")
const authenticate= require("./middleware/auth")

router.post("/register",employeeController.register)
router.post("/login",employeeController.login)
router.get("/employees",authenticate,employeeController.getAllEmployees)
router.get("/employees/:id",authenticate,employeeController.getEmployee)
router.post("/employees",authenticate,employeeController.addEmployee)
router.put("/employees/:id",authenticate,employeeController.updateEmployee)
router.delete("/employees/:id",authenticate,employeeController.deleteEmployee)


module.exports=router