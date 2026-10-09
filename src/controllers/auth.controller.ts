import { Request, Response } from "express";
import { authService, AuthService } from "../services/auth.service";
import { LoginDTO, RegisterDTO } from "../schemas/auth.schema";

/**
 * Controlador para los endpoints de autenticacion.
 * Maneja la entrada y salida HTTP delegando toda la logica de negocio al servicio.
 */
export class AuthController {
  constructor(private readonly authServ: AuthService = authService) {}

  /**
   * POST /auth/register
   * Recibe datos validados del usuario, invoca el servicio de registro y responde 201 Created.
   */
  register = async (req: Request, res: Response): Promise<void> => {
    const data: RegisterDTO = req.body;
    const user = await this.authServ.register(data);

    res.status(201).json({
      status: "success",
      data: user,
    });
  };

  /**
   * POST /auth/login
   * Recibe credenciales validadas, autentica al usuario y responde 200 OK con token y datos de usuario.
   */
  login = async (req: Request, res: Response): Promise<void> => {
    const data: LoginDTO = req.body;
    const authData = await this.authServ.login(data);

    res.status(200).json({
      status: "success",
      data: authData,
    });
  };
}

export const authController = new AuthController();
