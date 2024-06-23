import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';
import { LogService } from './logs/log.service';
import { ResponseTimeInterceptor } from './common/interceptors/response-time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseTimeInterceptor()
  );

  const logService = app.get(LogService);
  app.useGlobalInterceptors(new ErrorsInterceptor(logService));

  app.enableCors();
  await app.listen(3000);
}
bootstrap();