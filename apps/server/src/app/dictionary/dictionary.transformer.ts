import { Category } from '../category/category.entity';
import { Option } from '../option/option.entity';
import { Slider } from '../slider/slider.entity';

export class DictionaryTransformer {
  category: Category[];
  slider: Slider[];
  option: Option[];
}
