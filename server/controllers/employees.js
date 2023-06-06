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

    //    const employee = await prisma.user.update({
    //     where: {
    //         id: req.user.id
    //     },
    //     data: {
    //         createdEmployee: {
    //             create: data
    //         }
    //     }
    //  });

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

module.exports = {
    getAllEmployees,
    addEmployee
}