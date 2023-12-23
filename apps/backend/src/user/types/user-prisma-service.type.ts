import { PrismaService } from '../../prisma/prisma.service';

export type TUserPrismaService = Pick<PrismaService, 'user'>;
