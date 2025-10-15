import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { config } from "../config/app.config";
import { HTTPSTATUS } from "../config/http.config";
import passport from "passport";
import { registerSchema } from "../validation/auth.validation";
import { registerUserService } from "../services/auth.service";
import { auth, signInWithEmailAndPassword } from "../config/firebase.config";
import { refreshToken } from "firebase-admin/app";

export const googleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const currentWorkspace = req.user?.currentWorkspace;

    if (!currentWorkspace) {
      return res.redirect(
        `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
      );
    }

    return res.redirect(
      `${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`
    );
  }
);

export const registerUserController = asyncHandler(
    async (req: Request, res: Response) => {
      const body = registerSchema.parse({
        ...req.body,
      });
  
      await registerUserService(body);
  
      return res.status(HTTPSTATUS.CREATED).json({
        message: "User created successfully",
      });
    }
  );

  // export const loginController = asyncHandler(
  //   async (req: Request, res: Response) => {
  //     const { email, password } = req.body;
  
  //     if (!email || !password) {
  //       return res.status(HTTPSTATUS.BAD_REQUEST).json({ message: "Email and password are required" });
  //     }
  
  //     try {
  //       // Login ke Firebase Authentication
  //       const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //       const user = userCredential.user;
  //       console.log(user)
  //       const idToken = await user.getIdToken(); // Dapatkan token dari Firebase
  
  //       return res.status(HTTPSTATUS.OK).json({
  //         success: true,
  //         message: "Login successful",
  //         email: user.email,
  //         token: idToken, // Kirim token ke frontend
  //         refreshToken: user.refreshToken,
  //         user: {
  //           uid: user.uid,
  //           email: user.email,
  //           displayName: user.displayName,
  //         },
  //       });
  //     } catch (error: any) {
  //       return res.status(HTTPSTATUS.UNAUTHORIZED).json({
  //         message: error.message || "Invalid email or password",
  //       });
  //     }
  //   }
  // );
  export const loginController = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate(
        "local",
        (
          err: Error | null,
          user: Express.User | false,
          info: { message: string } | undefined
        ) => {
          if (err) {
            return next(err);
          }
  
          if (!user) {
            return res.status(HTTPSTATUS.UNAUTHORIZED).json({
              message: info?.message || "Invalid email or password",
            });
          }
  
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
  
            return res.status(HTTPSTATUS.OK).json({
              message: "Logged in successfully",
              user,
            });
          });
        }
      )(req, res, next);
    }
  );

  export const logOutController = asyncHandler(
    async (req: Request, res: Response) => {
      req.logout((err) => {
        if (err) {
          console.error("Logout error:", err);
          return res
            .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
            .json({ error: "Failed to log out" });
        }
      });
  
      req.session = null;
      return res
        .status(HTTPSTATUS.OK)
        .json({ message: "Logged out successfully" });
    }
  );
  