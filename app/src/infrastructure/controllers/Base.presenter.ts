import { mixin } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

type Constructor<T = {}> = new (...args: any[]) => T;

export const withBaseResponse = <TBase extends Constructor>(
  Base: TBase,
  isArray = false,
) => {
  class ResponseDTO {
    @ApiProperty({
      example: "/todo/todos",
    })
    path: string;

    @ApiProperty({
      example: "23ms",
    })
    duration: string;

    @ApiProperty({
      example: "GET",
    })
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

    @ApiProperty({
      isArray,
      type: Base,
    })
    data!: Array<InstanceType<TBase>>;
  }
  return mixin(ResponseDTO);
};
