import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { CustomBoardRepository } from './board-custom-repository.interface';

export const BoardRepository = (
  dataSource: DataSource,
): CustomBoardRepository => {
  const repository = dataSource.getRepository(Board);
  return repository.extend({
    async createBoard(
      this: Repository<Board>,
      createBoardDto: CreateBoardDto,
    ): Promise<Board> {
      const { title, description } = createBoardDto;

      const board = this.create({
        title,
        description,
        status: BoardStatus.PUBLIC,
      });
      await this.save(board);
      return board;
    },
  });
};
