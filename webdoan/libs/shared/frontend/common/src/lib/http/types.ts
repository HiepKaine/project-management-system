export type ApiResponsePagination = {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
export type ApiSuccessResponse = {
  data: {
    success: boolean;
  }
}

export type ApiCollectionResponse<T> = {
  data: T[],
}

export type ApiPaginateResponse<T> = {
  data: T[],
  meta: {
    pagination: ApiResponsePagination
  }
}

export type ApiItemResponse<T> = {
  data: T,
}
