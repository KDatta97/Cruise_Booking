import express from "express"
import Cruise from "../models/Cruise.js"
import { countByCruiseLine, countByDeparturePort, createCruise, deleteCruise, getCruise, getCruises, updateCruise } from "../controllers/cruise.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express .Router();

//CREATE
router.post("/", verifyAdmin, createCruise);

//UPDATE
router.put("/:id", verifyAdmin, updateCruise);

//DELETE
router.delete("/:id",verifyAdmin, deleteCruise);

//GET
router.get("/find/:id", getCruise);

//GET ALL
router.get("/", getCruises);

//COUNT BY DEPARTUREPORT
router.get("/countByDeparturePort", countByDeparturePort);

//COUNT BY CRUISE LINE
router.get("/countByCruiseLine", countByCruiseLine);


export default router