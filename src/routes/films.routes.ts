import { Router } from "express";
import { deleteTebeo, getTebeo, getTebeoWithId, postTebeo, putTebeo } from "../controllers/films.controller.js";



const router = Router();


router.get("/", getTebeo);

router.get("/:id", getTebeoWithId);

router.post("/", postTebeo);

router.put("/:id", putTebeo);

router.delete("/:id", deleteTebeo);

// router.patch("/:id", patchFilm);


export default router;