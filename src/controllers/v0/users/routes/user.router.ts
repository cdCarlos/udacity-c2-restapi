import { Router, Request, Response } from "express";

import { User } from "../models/User";
import { AuthRouter, requireAuth } from "./auth.router";

const router: Router = Router();

router.use("/auth", AuthRouter);

router.get("/", async (req: Request, res: Response) => {
    const users = await User.findAndCountAll();
    res.send(users);
});

router.get("/:id", async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await User.findByPk(id);
    res.send(item);
});

router.post("/", async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    // check email is valid
    if (!email) {
        return res
            .status(400)
            .send({ message: "Email is required or malformed" });
    }

    // check password is valid
    if (!password) {
        return res.status(400).send({ message: "Password is required" });
    }

    // check if user already exists
    if (await User.findByPk(email)) {
        res.status(422).send({
            auth: false,
            message: "This user may already exists"
        });
    }

    const hashed_password = await generatePassword(password);

    const user = await new User({
        email: email,
        password_hash: hashed_password
    });

    const saved_user = await user.save();

    res.status(201).send(saved_user);
});

export const UserRouter: Router = router;
