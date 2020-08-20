export const CustomerHTMLConverter = (customerObj, relatedEmployees) => {
    return `
        <div class="customer">
            <header class="employee__name ${customerObj.id}">
                <h1>${customerObj.name}</h1>
            </header>
            <section class="employee__customers">
                Is working with the following employees:
                <ul>
                    ${
                        relatedEmployees.map(employee => `<li>${employee.firstName} ${employee.lastName}</li>`).join("")
                    
                    }
                </ul>
            </section>
        </div>
    `
}
