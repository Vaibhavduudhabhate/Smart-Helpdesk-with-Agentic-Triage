import express from "express";
import { addNewKbController, deleteKbController, kbListController, kbsearchController, upadteKbController } from "../Controllers/kbarticleController.js";

const router = express.Router();

router.get('/',kbsearchController);
// router.get("/kblist",kbListController);
router.post("/",addNewKbController);
router.put("/:id",upadteKbController);
router.delete("/:id",deleteKbController)


export default router;