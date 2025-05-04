import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;
    return this.userRepository.save(user);
  }

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneUser(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.email = updateUserDto.email ?? user.email;
    user.username = updateUserDto.username ?? user.username;
    user.password = updateUserDto.password ?? user.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number): Promise<{ affected?: number | null }> {
    return this.userRepository.delete(id);
  }
}
