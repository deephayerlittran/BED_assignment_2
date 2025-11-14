import { Router } from "express";
import * as controller from "../controllers/branchController";

const router = Router();

router.get("/", controller.getBranches);
router.get("/:id", controller.getBranchById);
router.post("/", controller.createBranch);
router.put("/:id", controller.updateBranch);
router.delete("/:id", controller.deleteBranch);

export default router;
