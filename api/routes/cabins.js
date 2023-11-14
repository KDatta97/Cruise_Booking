import express from "express";
import {createCabin, deleteCabin, getCabin, getCabins, updateCabin, updateCabinAvailability,} from "../controllers/cabin.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:cruiseid", verifyAdmin, createCabin);

//UPDATE
router.put("/availability/:id", updateCabinAvailability);

//UPDATE AVAIALBILITY
router.put("/:id", verifyAdmin, updateCabin);

//DELETE
router.delete("/:id/:cruiseid", verifyAdmin, deleteCabin);

//GET
router.get("/:id", getCabin);

//GET ALL
router.get("/", getCabins);

export default router;