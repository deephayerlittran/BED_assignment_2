import { Router } from "express";
import employeeRoutes from "./employeeRoutes";
import branchRoutes from "./branchRoutes";
import logicalRoutes from "./logicalOperationsRoutes";

const router = Router();

router.use("/employees", employeeRoutes);
router.use("/branches", branchRoutes);
router.use("/logic", logicalRoutes);

export default router;
