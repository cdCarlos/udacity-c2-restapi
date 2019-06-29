import { Router, Request, Response } from "express";
import * as bcrypt from "bcrypt";

import { User } from "../models/User";
import { AuthRouter, requireAuth } from "./auth.router";

async function generatePassword(plainPassword: string): Promise<string> {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    return bcrypt.hash(plainPassword, salt);
}

async function comparePasswords(
    password: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

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
    return res.status(400).send({ message: "Email is required or malformed" });
  }

  // check password is valid
  if (!password) {
    return res.status(400).send({ message: "Password is required" });
  }

  const user = await new User({
    email: email,
    password_hash: password
  });

  const saved_user = await user.save();

  res.status(201).send(saved_user);
});

export const UserRouter: Router = router;
