# Backend Developer Task
   
## Hint:
The Following Assignment Involves Authentication And Authorization For all routes/api’s. This will be based on a role key in the Employee Collection. So , hence you will also try to capture the role key in the JWT token.


Task is to build course management system, where you will have to create three user roles, Super Admin, Admin and Employee, perform CRUD operation 

## Sign up - 
Create new Employee (name, email, password (encrypted), role )
By default, Employee

## Sign In - 
Sign in with email and password

## Admin - 
Create new course (title, description, video Url, topics array, duration, category, )
Update existing course (admin should able to add/delete part of the courses which potentially consists of pdfs, videos, and quizzes)
Delete Course

## Super Admin - 
Approve Created and updated course by admin (Note: Employee can only see course Approved by super Admin)

## Employee - 
View existing course (only if logged in and approved by super admin)
Use Token for login
Sort course category wise
