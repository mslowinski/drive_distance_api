import { Request, Response, NextFunction } from 'express';
import { Street } from '../interface/street';

export const getApi = async (req: Request, res: Response) => {
  return res.status(200).send({ title: 'Drive Distance API' });
};

export const closest = async (req: Request, res: Response, next: NextFunction) => {
  const { x, y } = req.query;
  return res.status(200).send();
};

export const street = async (req: Request, res: Response, next: NextFunction) => {
  const { name, start, end }: Street = req.body;
  return res.status(201).send(`Street ${name} added`);
};
