import { HttpClientModule } from '@angular/common/http';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  MoreOutline,
  SwapOutline,
} from '@ant-design/icons-angular/icons';
import {
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuModule } from './context-menu.module';

const nzPlacements = ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'];

const icons: IconDefinition[] = [SwapOutline, MoreOutline];

export default {
  title: 'Context Menu',
  component: ContextMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [ContextMenuModule, HttpClientModule, NzIconModule.forRoot(icons),],
    })
  ],
  argTypes: {
    contextIcon: {
      control: { type: 'string' },
    },
    nzPlacement: {
      options: nzPlacements,
      control: { type: 'select' },
    },
    nzTrigger: {
      options: ['hover', 'click'],
      control: { type: 'select' },
    },
    nzDisabled: {
      control: { type: 'boolean' },
    },
  },
} as Meta<ContextMenuComponent>;

const Template: Story<ContextMenuComponent> = (args: ContextMenuComponent) => ({
  component: ContextMenuComponent,
  props: args,
});


export const Icon = Template.bind({});
Icon.args = {
  contextIcon: 'more',
  nzPlacement: 'bottomRight',
  nzDisabled: false,
  nzTrigger: 'click',
  items: [{ label: 'First item', icon: 'swap', link: '/' }, { label: '2nd item', link: '/' }, { label: '3rd item', link: '/' }],
}

