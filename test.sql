

SELECT a.Name AS Employee, b.Name AS Manager
FROM EMPLOYEES a, EMPLOYEES b
WHERE a.ManagerID = b.EmployeeID;


SELECT EMPLOYEES.name
FROM EMPLOYEES 
WHERE EMPLOYEES.ManagerID = EMPLOYEES.EmployeeID