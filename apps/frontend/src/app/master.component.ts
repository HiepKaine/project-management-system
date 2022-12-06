import { Component } from '@angular/core';

@Component({
  selector: 'app-master',
  template: `
  <nb-layout>
    <nb-layout-column class="w-100 wrapper p-0">
      <router-outlet></router-outlet>
    </nb-layout-column>
  </nb-layout>
  `,
})
export class MasterComponent { }
