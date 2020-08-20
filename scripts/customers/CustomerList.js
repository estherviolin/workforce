import { CustomerHTMLConverter } from "./CustomerHTMLConverter.js"
import { useEmployees, getEmployees } from "../employees/EmployeeDataProvider.js"
import { useCustomers, getCustomers} from "./CustomerProvider.js"
import { useEmployeeCustomers, getEmployeeCustomers} from "./EmployeeCustomerProvider.js"


const contentTarget = document.querySelector(".customerContainer")

export const CustomerList = () => {
    getCustomers()
        .then(() => {
            const allCustomers = useCustomers()
            render(allCustomers)
        })


}

const render = (arrayOfCustomers) => {
    getEmployees()
        .then(getEmployeeCustomers)
        .then(() => {
            const employees = useEmployees()
            const customerRelationships = useEmployeeCustomers()
            const customersHTMLList = arrayOfCustomers.map(cust => {
                let relatedEmployees = customerRelationships.filter(cr => cr.customerId === cust.id)
                relatedEmployees = relatedEmployees.map(relatedEmployeeObj => {
                    return employees.find(employee => employee.id === relatedEmployeeObj.employeeId)
                })
                return CustomerHTMLConverter(cust, relatedEmployees)
            }).join("")

            contentTarget.innerHTML = customersHTMLList
        })
}