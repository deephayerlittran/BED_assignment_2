import { Router } from "express";
import * as controller from "../controllers/employeeController";
import { validate } from "../middleware/validateRequest";
import {
    createEmployeeSchema,
    updateEmployeeSchema,
} from "../validation/employeeValidation";

const router = Router();

router.get("/", controller.getEmployees);
router.get("/:id", controller.getEmployeeById);

router.post("/", validate(createEmployeeSchema), controller.createEmployee);

router.put("/:id", validate(updateEmployeeSchema), controller.updateEmployee);

router.delete("/:id", controller.deleteEmployee);

export default router;
