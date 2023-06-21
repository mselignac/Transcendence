import { IsString } from 'class-validator';

export class twofactorCode {
  @IsString()
  readonly code: string;
}