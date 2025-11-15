import { Router } from "express";
import * as controller from "../controllers/branchController";
import { validate } from "../middleware/validateRequest";
import { createBranchSchema, updateBranchSchema } from "../validation/branchValidation";

const router = Router();

router.get("/", controller.getBranches);
router.get("/:id", controller.getBranchById);
router.post("/", validate(createBranchSchema), controller.createBranch);
router.put("/:id", validate(updateBranchSchema), controller.updateBranch);
router.delete("/:id", controller.deleteBranch);

export default router;
