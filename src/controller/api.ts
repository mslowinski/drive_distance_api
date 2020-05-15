import { Request, Response, NextFunction } from 'express';

export const getApi = async (req: Request, res: Response) => {
  return res.status(200).send({ title: 'Drive Distance API' });
};
