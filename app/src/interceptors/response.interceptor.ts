import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import type { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class ResponseFormat<T> {
  @ApiProperty()
  isArray: boolean;
  @ApiProperty()
  path: string;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  method: string;

  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      map((data) => ({
        data,
        isArray: Array.isArray(data),
        path: request.path,
        duration: `${Date.now() - now}ms`,
        method: request.method,
      })),
    );
  }
}
