import { plainToInstance } from 'class-transformer';

import { Injectable } from '@nestjs/common';

import {
  ApiItemResponse,
  ApiPaginateResponse,
} from './types';

@Injectable()
export class ApiResponseService {
  /**
   * Bind an item to a transformer and start building a response
   *
   * @param {*} Object
   * @param {*} Transformer
   *
   * @return Object
   */
  item<T>(item: T, transformer): ApiItemResponse<T> {
    return { data: plainToInstance(transformer as any, item) };
  }

  /**
   * Bind a collection to a transformer and start building a response
   *
   * @param {*} collection
   * @param {*} transformer
   *
   * @return Object
   */
  collection(collection, transformer) {
    const data = collection.map(i => plainToInstance(transformer as any, i));
    return { data };
  }

  object(data) {
    return { data };
  }

  success() {
    return { data: { success: true } };
  }

  /**
   * Bind a paginator to a transformer and start building a response
   *
   * @param {*} LengthAwarePaginator
   * @param {*} Transformer
   *
   * @return Object
   */
  paginate<T>(paginator, transformer): ApiPaginateResponse<T> {
    const items = paginator.items.map(item => plainToInstance(transformer as any, item));
    return {
      data: items,
      meta: {
        pagination: {
          itemCount: paginator.meta.itemCount,
          totalItems: paginator.meta.totalItems,
          itemsPerPage: paginator.meta.itemsPerPage,
          currentPage: paginator.meta.currentPage,
          totalPages: paginator.meta.totalPages,
        },
      },
    };
  }
}
