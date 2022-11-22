import {
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import {
  IPaginationOptions,
  Pagination,
} from './types';

export class BaseService<T> {
  public entity: EntityTarget<T>;
  public repository: Repository<T>;

  async get(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  private resolveOptions(options?: IPaginationOptions): [number, number] {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;

    return [page, limit];
  }

  private async paginateQueryBuilder<T>(queryBuilder: SelectQueryBuilder<T>, options: IPaginationOptions): Promise<Pagination<T>> {
    const [page, limit] = this.resolveOptions(options);

    const [items, total] = await queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();

    return this.createPaginationObject<T>(items, total, page, limit);
  }

  private createPaginationObject<T>(items: T[], totalItems: number, currentPage: number, limit: number) {
    const totalPages = Math.ceil(totalItems / limit);
    return new Pagination(items, {
      totalItems: totalItems,
      itemCount: items.length,
      itemsPerPage: limit,
      totalPages: totalPages,
      currentPage: currentPage,
    });
  }

  async paginate(queryBuilder?: SelectQueryBuilder<T> | null, options?: IPaginationOptions): Promise<Pagination<T>> {
    const query = queryBuilder ?? this.repository.createQueryBuilder();
    return this.paginateQueryBuilder(query, options);
  }

  async find(id: string | number, options?: FindOneOptions): Promise<T> {
    return this.repository.findOne(id, options);
  }

  async findByIds(ids: string[] | number[]): Promise<T[]> {
    return this.repository.findByIds(ids);
  }

  async findOrFail(id: string | number, options?: FindOneOptions): Promise<T> {
    const item = await this.repository.findOne(id, options);
    if (!item) {
      throw new BadRequestException('Resource not found');
    }
    return item;
  }

  /**
   * Save a new model and return the instance.
   *
   * @param data
   */
  async create<DTO>(data: DTO): Promise<T> {
    const { identifiers } = await this.repository.createQueryBuilder()
      .insert()
      .into(this.entity)
      .values(data)
      .execute();
    return this.find(identifiers[0].id);
  }

  /**
   * Get the first record matching the attributes or create it
   *
   * @param options FindOneOptions
   * @param values
   */
  async firstOrCreate<DTO>(options: FindOneOptions, data: DTO): Promise<T> {
    return await this.repository.findOne(options) ?? await this.create(data);
  }

  /**
   * Execute the query and get the first result or throw an exception
   *
   * @param options FindOneOptions
   * @param values
   */
  async firstOrFail(options: FindOneOptions): Promise<T> {
    const item = await this.repository.findOne(options);
    if (!item) {
      throw new NotFoundException('Resource');
    }
    return item;
  }

  /**
   * Update an entity in repository by id
   *
   * @param id number | string
   * @param data
   */
  async update<DTO>(id: number | string, data: DTO): Promise<T> {
    await this.repository.createQueryBuilder()
      .update(this.entity)
      .set(data)
      .where("id = :id", { id })
      .execute()
    return this.find(id);
  }

  /**
   * Create or update a related record matching the attributes, and fill it with values.
   *
   * @param values number | string
   * @param values
   *
   * @return entity
   */
  async updateOrCreate<S extends ObjectLiteral, DTO>(condition: S, data: DTO): Promise<T> {
    return await this.repository.findOne({ where: condition }) ?? await this.create(data)
  }

  /**
   * Execute the query and get the first result
   *
   * @param options FindOneOptions
   */
  async first(options: FindOneOptions): Promise<T> {
    return await this.repository.findOne(options);
  }

  /**
   * Return number of record that match criteria
   *
   * @param options
   */
  async count(options: FindManyOptions): Promise<number> {
    return await this.repository.count(options);
  }

  /**
   * Destroy the models for the given ID
   *
   * @param id Number | String
   */
  async destroy(id: number | string): Promise<void> {
    await this.repository.delete(id);
  }

}
