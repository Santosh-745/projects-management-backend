import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtSerivce: JwtService,
        private readonly configService: ConfigService,
    ) {}
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const Authorization = request.headers['authorization'];
        if (!Authorization) {
            throw new UnauthorizedException();
        }
        const token = Authorization.replace('Bearer ', '');
        const verify = await this.jwtSerivce.verifyAsync(
            token,
            { secret: this.configService.get('JWT_SECRET') }
        );
        if (!verify) {
            throw new UnauthorizedException();
        }
        request.user = verify;
        return true;
    }
}