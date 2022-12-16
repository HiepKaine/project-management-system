import { Connection } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Dictionary } from './types';

@Injectable()
export class DictionaryService {
  constructor(private connection: Connection) { }

  async getData(): Promise<Dictionary> {
    return {   };
  }
}
