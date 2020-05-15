import { Request, Response, NextFunction } from 'express';
import { Street } from '../interface/street';
import { addStreet, findClosestStreet } from "../service/street";
import { APILogger } from "../lib/logger";

export const getApi = async (req: Request, res: Response) => {
  return res.status(200).send({ title: 'Drive Distance API' });
};

export const closest = async (req: Request, res: Response, next: NextFunction) => {
  const { x, y } = req.query;
  if (!x || !y) {
    APILogger.logger.error(`[GET] [/api/closest] Missing query params`);
    return res.status(404).send('Missing param') };

  try {
    const closestStreets =  await findClosestStreet(Number(x), Number(y));
    return res.status(200).send({ closestStreets });
  } catch (error) {
    next(error);
  }
};

export const street = async (req: Request, res: Response, next: NextFunction) => {
  const { name, start, end }: Street = req.body;
  try {
    await addStreet({name, start, end});
    APILogger.logger.info(`[POST] [/api/street] Added new street: '${name}'`);
    return res.status(201).send(`Street '${name}' added`);
  } catch (error) {
    next(error);
  }
};
