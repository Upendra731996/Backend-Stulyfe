# Backend-Stulyfe
 
note: 1.First, run npm i to install dependencies. Use npm start to start the server. Place the Firebase credential file in the src sibling directory (not inside src), as GitHub does not allow pushing it. Token verification for protected routes is bypassed temporarily."

2."All routes (/employees, /employees/:id, /employees POST, /employees/:id PUT, and /employees/:id DELETE) require authentication tokens for access."



<!-- ========== Registration -->
Employee Registration API
Endpoint: POST /register
Purpose: Register new employees and handle authentication.
Requirements: Send employee details (email, password, name, salary, role, department) in JSON format.
Response: Returns a token upon successful registration for authentication.

<!-- Employee Login API -->
Endpoint: POST /login
Purpose: Authenticate employees based on email and password.
Requirements: Provide valid email and password in JSON format.
Response: Returns a token upon successful login for authentication.

<!-- Get All Employees API -->
Endpoint: GET /employees
Purpose: Retrieve details of all employees from the database.
Response: Returns a list of employees including their ID, name, salary, role, and department upon success.
This summary provides 


<!-- Get Employee Details API -->
Endpoint: GET /employees/:id
Purpose: Retrieve details of a specific employee based on their ID.
Parameters:
id (integer, required): ID of the employee to retrieve details for.
Response: Returns the employee's details including ID, name, salary, role, and department upon success.


<!-- Add Employee API -->
Endpoint: POST /employees
Purpose: Add a new employee to the database.
Request Body:
name (string, required): Name of the new employee.
salary (number, required): Salary of the new employee.
role (string, required): Role of the new employee.
department (string, required): Department of the new employee.
Response: Returns details of the newly added employee upon success.


<!-- Update Employee API -->
Endpoint: PUT /employees/:id
Purpose: Update details of a specific employee based on their ID.
Parameters:
id (integer, required): ID of the employee to update.
Request Body: Provide fields to update:
name (string): Updated name of the employee.
department (string): Updated department of the employee.
salary (number): Updated salary of the employee.
role (string): Updated role of the employee.
Response: Returns details of the updated employee upon success, or an error message if the employee was not found.


<!-- Delete Employee API -->
Endpoint: DELETE /employees/:id
Purpose: Delete a specific employee based on their ID.
Parameters:
id (integer, required): ID of the employee to delete.  
Response: Returns a success message upon successfully deleting the employee, or an error message if the employee was not found.