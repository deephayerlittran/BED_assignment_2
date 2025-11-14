import { Router } from "express";
import * as controller from "../controllers/logicalOperationsController";

const router = Router();

router.get("/branch/:branchId", controller.getEmployeesByBranch);
router.get("/department/:department", controller.getEmployeesByDepartment);

export default router;
