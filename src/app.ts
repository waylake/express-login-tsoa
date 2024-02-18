import express, { Express, Response, Request } from "express";
import cors from "cors";
import { logger, envConfig, connectDB } from "@/config";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../tsoa-ouput/routes";

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.setup();
    this.setupRoutes();
    connectDB();
  }

  private setup(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use((req, _, next) => {
      logger.info(`${req.method} ${req.url}`);
      next();
    });
  }

  private setupRoutes(): void {
    const API_VERSION = envConfig.API_VERSION;

    this.app.use(
      `/${API_VERSION}/api-docs`,
      swaggerUi.serve,
      async (_: Request, res: Response) => {
        return res.send(
          swaggerUi.generateHTML(await import("../tsoa-ouput/swagger.json")),
        );
      },
    );

    this.app.get("/", (_, res: Response) => {
      res.json({ message: "Hello World" });
    });

    RegisterRoutes(this.app);
  }

  public start(): void {
    const PORT = envConfig.PORT;
    this.app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  }
}

const app = new App();
app.start();
