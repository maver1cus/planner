import {Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus} from "@nestjs/common";
import {ExpressRequestInterface} from "@app/types/expres-request.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean  {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>()

    if (request.user) {
      return true
    }

    throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
  }
}