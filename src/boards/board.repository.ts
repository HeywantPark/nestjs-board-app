import { DataSource } from 'typeorm';
import { Board } from './board.entity';

export const BoardRepository = (dataSource: DataSource) => {
  return dataSource.getRepository(Board).extend();
};
