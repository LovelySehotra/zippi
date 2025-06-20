import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    console.log(`[${method}] ${url} - Incoming request`);

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `[${method}] ${url} - Responded in ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
