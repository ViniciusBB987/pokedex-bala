import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, throwError } from "rxjs";
import { LogService } from "src/logs/log.service";



@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    constructor(private readonly logService: LogService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(async (err) => {
                await this.logService.logError(err.message);
                console.error('Error:', err);
                return throwError(err);
            }),
        );
    }
}