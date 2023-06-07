const {prisma} = require('../prisma/prisma-client');

/** 
  @route GET /api/employees/
  @desc get employees
  @access Private
*/

const getAllEmployees = async(req, res) => {
    try {
      const employees = await prisma.employee.findMany();
      
      res.status(200).json(employees)
    } catch {
      res.status(500).json({message: "something went wrong"})  
    }
}

/** 
  @route POST /api/employees/add
  @desc add employee
  @access Private
*/

const addEmployee = async(req, res) => {
    try {
       const data = req.body;

       if(!data.firstName || !data.lastName || !data.address || !data.age) {
         return res.status(400).json({message: 'All fields are required'})
       }

    const employee = await prisma.employee.create({
      data: {
          ...data,
          userId: req.user.id
      }
  });

     res.status(201).json(employee);
  } catch(e) {
     res.status(500).json({message: "something went wrong"}) 
  }
}

/** 
  @route DELETE /api/employees/remove/:id
  @desc remove employee
  @access Private
*/

const removeEmployee = async(req, res) => {
  try {
    const {id} = req.params

    if(id) {
      await prisma.employee.delete({
        where: {
          id
        }
      })

     res.status(204).json({message: 'user deleted'})
    }
  } catch(e) {
    res.status(500).json({message: "failed to delete user"}) 
  }
}

/** 
  @route GET /api/employees/:id
  @desc get the employee
  @access Private
*/

const getEmployee = async(req, res) => {
  try {
    const {id} = req.params

    if(id) {
      const employee = await prisma.employee.findUnique({
        where: {
          id
        }
      })

      res.status(200).json(employee)
    }
  } catch(e) {
    res.status(500).json({message: "failed to get user"}) 
  }
}

/** 
  @route PUT /api/employees/edit/:id
  @desc edit employee
  @access Private
*/

const editEmployee = async(req, res) => {
  try {
    const data = req.body
    const id = data.id
    if(id) {
      const employee = await prisma.employee.update({
        where: {
          id
        },
        data
      })

      res.status(204).json('employee')
    }
  } catch(e) {
    res.status(500).json({message: "failed to edit user"}) 
  }
}

module.exports = {
    getAllEmployees,
    addEmployee,
    removeEmployee,
    getEmployee,
    editEmployee
}
