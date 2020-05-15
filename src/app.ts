import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as expressWinston from 'express-winston';
import * as winston from 'winston';
import { APIRoute } from "./route/api";
import { errorHandler } from './lib/errorHandler';

export class App {
  public app: express.Application;
  public apiRoutes: APIRoute = new APIRoute();

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.apiRoutes.routes(this.app);
    this.app.use(expressWinston.errorLogger({transports: [new winston.transports.Console()]}));
    this.app.use(errorHandler);
  }

  public async listen() {
    const PORT = parseInt(process.env.PORT || '3000');
    this.app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    })
  }
}

export default new App().app;
