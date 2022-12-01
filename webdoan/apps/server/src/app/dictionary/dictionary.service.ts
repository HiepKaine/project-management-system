import { Connection } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Category } from '../category/category.entity';
import { Slider } from '../slider/slider.entity';
import { Option } from '../option/option.entity';
import { Dictionary } from './types';

@Injectable()
export class DictionaryService {
  constructor(private connection: Connection) { }

  async getData(): Promise<Dictionary> {
    const category = await this.connection.getRepository(Category).find();
    const slider = await this.connection.getRepository(Slider).find();
    const option = await this.connection.getRepository(Option).find();
    
    return { category, slider, option };
  }
}
