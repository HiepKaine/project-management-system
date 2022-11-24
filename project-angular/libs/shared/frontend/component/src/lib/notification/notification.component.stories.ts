import { CommonModule } from '@angular/common';

import {
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import {
  BasicNotificationComponent,
} from './example/basic/basic-notification.component';
import {
  DemoTemplateNotificationComponent,
} from './example/basic/demo-template-notification';
import {
  HandleClickNotificationComponent,
} from './example/basic/handle-click-notification.component';
import docBasic from './notification-basic.component.mdx';
import docClick from './notification-handle-click.component.mdx';
import docTemplateRef from './notification-use-templateref.component.mdx';
import { NotificationModule } from './notification.module';

export default {
  title: 'Notification',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        NotificationModule,
      ],
      declarations: [BasicNotificationComponent, HandleClickNotificationComponent, DemoTemplateNotificationComponent]
    }),
  ],
} as Meta<BasicNotificationComponent>;

const BasicTemplate: Story<BasicNotificationComponent> = (args: BasicNotificationComponent) => ({
  component: BasicNotificationComponent,
  props: args,
});

export const Basic = BasicTemplate.bind({});
Basic.args = {
  title: 'Notification Title',
  content: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
}
Basic.parameters = {
  docs: {
    page: docBasic,
  },
}

const HandleClickTemplate: Story<HandleClickNotificationComponent> = (args: HandleClickNotificationComponent) => ({
  component: HandleClickNotificationComponent,
  props: args,
});

export const HandleClick = HandleClickTemplate.bind({});
HandleClick.args = {}
HandleClick.parameters = {
  docs: {
    page: docClick,
  },
}



export const TemplateNotification = (args: HandleClickNotificationComponent) => ({
  component: DemoTemplateNotificationComponent,
  props: args,
});
TemplateNotification.args = {}
TemplateNotification.parameters = {
  docs: {
    page: docTemplateRef,
  },
}
