import { Request } from 'express';
import { User } from '@prisma/client';

interface RequestWithUserInterface extends Request {
  user: User;
}

export default RequestWithUserInterface;
