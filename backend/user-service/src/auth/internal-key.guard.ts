import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class InternalKeyGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const key = req.headers['x-internal-key'];
    if (!key || key !== process.env.INTERNAL_KEY) {
      throw new UnauthorizedException('Invalid internal key');
    }
    return true;
  }
}
