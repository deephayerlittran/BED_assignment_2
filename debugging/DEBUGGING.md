# Debugging Notes

These are the main debugging steps I followed while working on the API.  
I used the VS Code debugger and breakpoints to check how my routes and services were working.

---

## 1. Employee Create Route
I put a breakpoint in `employeeController.ts` on the line where the new employee is created:

```
const newEmployee = employeeService.createEmployee(req.body);
```

I paused the code here to check:
- the incoming request body
- if the ID was assigned correctly

---

## 2. Branch Update Route
Then I debugged the branch update function.  
Breakpoint in `branchController.ts`:

```
const updated = branchService.updateBranch(id, req.body);
```

I checked:
- if the branch ID was correct
- what the update data looked like
- what happened when a branch did not exist

---

## 3. Logical Operations
Breakpoint in `logicalOperationsController.ts`:

```
const employees = logicService.getEmployeesByBranch(branchId);
```

I confirmed:
- the branchId value
- the list of employees returned
- the behavior when no employees matched

---

## 4. How I Took the Screenshots
- Started the server using the VS Code debugger (F5)
- added breakpoints, I opened the VARIABLES menu
- Took screenshots showing the paused line, the red dot, and the variable values


---

This helped me understand how data moved through the controllers and services and made fixing small mistakes easier.
