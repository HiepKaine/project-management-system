import { Category } from '../category/category.entity';
import { Slider } from '../slider/slider.entity';
import { Option } from '../option/option.entity';

export type Dictionary = {
  category: Category[],
  slider: Slider[],
  option: Option[],
}
