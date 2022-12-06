import { ApiPaginateResponse } from '@frontend/common';
import { Faq } from '@frontend/models/faq.modal';
import {
  createAction,
  props,
} from '@ngrx/store';

export const removeFaqRequested = createAction(
  '[FaqManager/API] remove faq requested',
  props<{ payload: Faq }>()
);

export const removeFaqSuccessed = createAction(
  '[FaqManager/API] remove faq successed',
  props<{ payload: Faq }>()
);

export const fetchFaqRequested = createAction(
  '[FaqManager/API] fetch faq requested',
  props<{ payload?: { keyword?: string, page?: number } }>()
);

export const fetchFaqSuccessed = createAction(
  '[FaqManager/API] fetch faq successed',
  props<{ payload: ApiPaginateResponse<Faq> }>()
);
