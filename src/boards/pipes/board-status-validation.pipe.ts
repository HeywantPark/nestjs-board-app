import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions: BoardStatus[] = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC,
  ];

  transform(value: string): BoardStatus {
    value = value.toUpperCase();

    if (!this.isStatusValid(value as BoardStatus)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    return value as BoardStatus;
  }
  private isStatusValid(status: BoardStatus) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
