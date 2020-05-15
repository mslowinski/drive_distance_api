import { NextFunction, Request, Response } from "express";
import { APILogger } from "./logger";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  APILogger.logger.error(`Unexpected error ${error.message}`);
  res.status(500).send({ error: error.message });
};
