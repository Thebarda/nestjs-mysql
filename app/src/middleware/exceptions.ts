import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import type { LoggerService } from "src/infrastructure/logger/logger.service";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as object)
        : { message: (exception as Error).message, code_error: null };

    const responseData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...message,
    };

    this.logMessage({ request, message, status, exception });

    response.status(status).json(responseData);
  }

  private logMessage({ request, message, status, exception }) {
    if (status === 500) {
      this.logger.error(
        `End request for ${request.path}`,
        `(method: ${request.method} status: ${status} code_error: ${message.code_error || null} message: ${message.message || null})`,
        status >= 500 ? exception.stack : "",
      );
      return;
    }

    this.logger.warn(
      `End request for ${request.path}`,
      `(method: ${request.method} status: ${status} code_error: ${message.code_error || null} message: ${message.message || null})`,
    );
  }
}
