import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DATABASE_ERROR_CONTEXT, DatabaseException } from '@src/exceptions';

import { Position } from '@modules/position/entities/position.entity';

import { GetListUsersOptions, SORT_ORDER } from './constants/user.types';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserResponseType } from './dto/get-one-user.response.dto';
import { GetUserListResponseDto } from './dto/get-user-list.response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger(UserRepository.name);

  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createOne(data: CreateUserDto): Promise<void> {
    try {
      await this.save(data);
    } catch (error) {
      this.logger.log('Creating user exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_CREATE_ONE);
    }
  }

  async getOne(email: string): Promise<GetUserResponseType> {
    try {
      return await this.createQueryBuilder('u')
        .select(['u.id AS "id"', 'u.email AS "email"', 'u.phone AS "phone"', 'u.name AS "name"', 'u.photo AS "photo"'])
        .where('u.email = :email', {
          email,
        })
        .getRawOne();
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_GET_ONE);
    }
  }

  async getAuth(email: string): Promise<User> {
    try {
      return await this.findOne({ where: { email } });
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_GET_AUTH_ONE);
    }
  }

  async getAll(options: GetListUsersOptions): Promise<GetUserListResponseDto> {
    try {
      const { count = 10, offset = 0, sortDirection = SORT_ORDER.DESC, page } = options;

      const query = this.createQueryBuilder('u')
        .select([
          'u.id AS "id"',
          'u.email AS "email"',
          'u.phone AS "phone"',
          'u.name AS "name"',
          'u.photo AS "photo"',
          'p.id AS "positionId"',
          'p.name AS "position"',
        ])
        .leftJoin(Position, 'p', 'u.position_id = p.id')
        .limit(count)
        .offset(page ? page * count : offset)
        .orderBy('u.created_date', sortDirection);

      const [data, totalUsers] = await Promise.all([query.getRawMany(), query.getCount()]);

      return { page, count, totalPages: Math.ceil(totalUsers / count), totalUsers, data };
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_GET_MANY);
    }
  }

  async updateOne(id: string, data: UpdateUserDto): Promise<void> {
    try {
      await this.update(id, data);
    } catch (error) {
      this.logger.log('Updating User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_UPDATE_ONE);
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      this.logger.log('Deleting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_DELETE_ONE);
    }
  }
}
