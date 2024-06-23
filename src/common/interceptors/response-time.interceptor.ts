import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const now = Date.now();
        return next.handle().pipe(
            tap(() => console.log(`Tempo de resposta: ${Date.now() - now}ms`)),
        );
    }
}