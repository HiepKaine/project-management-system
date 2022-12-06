import { ApiPaginateResponse } from '@frontend/common';
import { Option } from '@frontend/models/option.model';
import {
  createAction,
  props,
} from '@ngrx/store';

export const removeOptionRequested = createAction(
  '[OptionManager/API] remove option requested',
  props<{ payload: Option }>()
);

export const removeOptionSuccessed = createAction(
  '[OptionManager/API] remove option successed',
  props<{ payload: Option }>()
);

export const fetchOptionRequested = createAction(
  '[OptionManager/API] fetch option requested',
  props<{ payload?: { keyword: string } }>()
);

export const fetchOptionSuccessed = createAction(
  '[OptionManager/API] fetch option successed',
  props<{ payload: ApiPaginateResponse<Option> }>()
);
