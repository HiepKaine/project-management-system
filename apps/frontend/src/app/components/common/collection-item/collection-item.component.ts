import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-item',
  templateUrl: './collection-item.component.html',
  styleUrls: ['./collection-item.component.scss'],
})
export class CollectionItemComponent implements OnInit {
  @Input() item!: any;
  @Input() type!: string;
  public isHover!: boolean;
  arr = [1, 2, 3, 4, 5, 6, 7, 8];
  ngOnInit() {}
}
