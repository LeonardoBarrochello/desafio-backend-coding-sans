import { response, Router } from "express";
import { BrewerieController } from "../controllers/BrewerieController";
import { UserController } from "../controllers/UserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const userController = new UserController();
const brewerieController = new BrewerieController();

router.post("/user", userController.create)
router.post("/user/login", userController.login)
router.get("/breweries", ensureAuthenticated, brewerieController.getBreweries)



export { router }