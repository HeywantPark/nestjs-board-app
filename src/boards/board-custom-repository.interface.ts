import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

export interface CustomBoardRepository extends Repository<Board> {
  createBoard(createBoard: CreateBoardDto, user: User): Promise<Board>;
}
