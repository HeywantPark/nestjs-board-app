import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';

export interface CustomBoardRepository extends Repository<Board> {
  createBoard(createBoard: CreateBoardDto): Promise<Board>;
}
