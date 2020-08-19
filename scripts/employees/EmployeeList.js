import { EmployeeHTMLConverter } from "./EmployeeHTMLConverter.js"
import { useEmployees, getEmployees } from "./EmployeeDataProvider.js"
import { useComputers, getComputers } from "../computers/ComputerDataProvider.js"
import { useDepartments, getDepartments} from "../departments/DepartmentDataProvider.js"
import { useLocations, getLocations } from "../locations/LocationDataProvider.js"
import { useCustomers, getCustomers} from "../customers/CustomerProvider.js"
import { useEmployeeCustomers, getEmployeeCustomers} from "../customers/EmployeeCustomerProvider.js"


const contentTarget = document.querySelector(".employeeContainer")

export const EmployeeList = () => {
    getEmployees()
        .then(() => {
            const allEmployees = useEmployees()
            render(allEmployees)
        })


}

const render = (arrayOfEmployees) => {
    getComputers()
        .then(getDepartments)
        .then(getLocations)
        .then(getCustomers)
        .then(getEmployeeCustomers)
        .then(() => {
            const arrOfDepartments = useDepartments()
            const arrayOfComputers = useComputers()
            const arrOfLocations = useLocations()
            const customers = useCustomers()
            const customerRelationships = useEmployeeCustomers()
            const employeesHTMLList = arrayOfEmployees.map(employee => {
                let relatedCustomers = customerRelationships.filter(cr => cr.employeeId === employee.id)
                relatedCustomers = relatedCustomers.map(rc => {
                    return customers.find(customer => customer.id === rc.customerId)
                })
                const relatedComputer = arrayOfComputers.find(computer => computer.id === employee.computerId)
                const relatedDepartment = arrOfDepartments.find(department => department.id === employee.departmentId)
                const relatedLocation = arrOfLocations.find(location => location.id === employee.locationId)
                return EmployeeHTMLConverter(employee, relatedComputer, relatedDepartment, relatedLocation, relatedCustomers)
            }).join("")

            contentTarget.innerHTML = employeesHTMLList
        })
}

// const EmployeeList = () => {
//     const customers = useCustomers()
//     const customerRelationships = useEmployeeCustomers()

//     const render = () => {
//         contentTarget.innerHTML = `
//             ${
//                 employees.map(employee => {
//                     // Find all the customer relationships
//                     const relationships = customerRelationships.filter()

//                     // Find the related customer for each relationship
//                     const assignedCustomers = relationships.map(rel => {
//                         return customers.find()
//                     })
//                 }).join("")
//             }
//         `
//     }

//     render()
// }


// const render = (arrayOfEmployees) => {
//     getComputers()
//         .then(getDepartments)
//         .then(getLocations)
//         .then(() => {
//             const arrOfDepartments = useDepartments()
//             const arrayOfComputers = useComputers()
//             const arrOfLocations = useLocations()
//             const employeesHTMLList = arrayOfEmployees.map(employeeObj => {
//                 const relatedComputer = arrayOfComputers.find(computer => computer.id === employeeObj.computerId)
//                 const relatedDepartment = arrOfDepartments.find(department => department.id === employeeObj.departmentId)
//                 const relatedLocation = arrOfLocations.find(location => location.id === employeeObj.locationId)
//                 return EmployeeHTMLConverter(employeeObj, relatedComputer, relatedDepartment, relatedLocation)
//             }).join("")

//             contentTarget.innerHTML = employeesHTMLList
//         })
// }