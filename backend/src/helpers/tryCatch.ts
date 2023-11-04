import express from 'express';

export const tryCatch =
  (controller: Function) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await controller(req, res);
    } catch (error) {
      console.log(`THIS IS THE ERROR BRUH: ${error}`);
      return next(error);
    }
  };
