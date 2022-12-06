import { BaseService } from '@server/common';
import { Injectable } from '@nestjs/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Slider } from './slider.entity';

@Injectable()
export class SliderService extends BaseService<Slider> {
  public entity: EntityTarget<Slider> = Slider;
  public repository: Repository<Slider> = this.connection.getRepository(Slider)
  constructor(private connection: Connection) {
    super();
  }
}