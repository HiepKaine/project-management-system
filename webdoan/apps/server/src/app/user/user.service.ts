import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { User } from '../auth/entity/user.entity';

@Injectable()
export class UserService extends BaseService<User>{
  public entity: EntityTarget<User> = User;
  public repository: Repository<User> = this.connection.getRepository(User);
  
  constructor(private connection: Connection){
    super()
  }
}
