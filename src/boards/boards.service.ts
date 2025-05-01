import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { DataSource } from 'typeorm';
import { CustomBoardRepository } from './board-custom-repository.interface';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  private boardRepository: CustomBoardRepository;

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {
    this.boardRepository = BoardRepository(this.dataSource);
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`can't find Board with id ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`can't find Board with id ${id}`);
    }
    console.log('result', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    return board;
  }
}
