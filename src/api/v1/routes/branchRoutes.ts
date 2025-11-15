import { Router } from "express";
import * as controller from "../controllers/branchController";

import { validateRequest } from "../middleware/validateRequest";
import {
    createBranchSchema,
    updateBranchSchema,
} from "../validation/branchValidation";

const router = Router();

router.get("/", controller.getBranches);

router.get("/:id", controller.getBranchById);

router.post("/", validateRequest(createBranchSchema), controller.createBranch);

router.put("/:id", validateRequest(updateBranchSchema), controller.updateBranch);

router.delete("/:id", controller.deleteBranch);

export default router;
