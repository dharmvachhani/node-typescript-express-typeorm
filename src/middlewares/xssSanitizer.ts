import { Request, Response, NextFunction } from 'express';
import xss from 'xss';

function sanitize<T = any>(input: T): T {
  if (typeof input === 'string') return xss(input) as T;

  if (Array.isArray(input)) {
    return input.map(sanitize) as T;
  }

  if (typeof input === 'object' && input !== null) {
    const sanitized: Record<string, any> = {};
    for (const key in input) {
      sanitized[key] = sanitize((input as any)[key]);
    }
    return sanitized as T;
  }

  return input;
}

export const xssSanitizer = (req: Request, res: Response, next: NextFunction) => {
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  next();
};
