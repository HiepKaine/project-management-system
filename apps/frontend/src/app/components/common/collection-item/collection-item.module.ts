import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollectionItemComponent } from './collection-item.component';

@NgModule({
  declarations: [CollectionItemComponent],
  imports: [CommonModule],
  exports: [CollectionItemComponent],
})
export class CollectionItemModule {}
