import {
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';

import { UserAvatarComponent } from './user-avatar.component';
import {
  NzShapeValues,
  UserAvatarThemeValues,
} from './user-avatar.const';
import { UserAvatarModule } from './user-avatar.module';

export default {
  title: 'User Avatar',
  component: UserAvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UserAvatarModule
      ],
    })
  ],
  argTypes: {
    theme: {
      options: UserAvatarThemeValues,
      control: { type: 'select' },
    },
    nzShape: {
      options: NzShapeValues,
      control: { type: 'select' },
    },
    nzSize: {
      control: { type: 'number' },
    },
    nzGap: {
      control: { type: 'number' },
    },
    nzSrc: {
      control: { type: 'text' },
    },
    nzSrcSet: {
      control: { type: 'text' },
    },
    nzAlt: {
      control: { type: 'text' },
    },
    nzText: {
      control: { type: 'text' },
    },
    user: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
    bgColor: {
      control: { type: 'color' },
    },
    textColor: {
      control: { type: 'color' },
    },
  },
} as Meta<UserAvatarComponent>;

const Template: Story<UserAvatarComponent> = (args: UserAvatarComponent) => ({
  component: UserAvatarComponent,
  props: args,
});


export const Basic = Template.bind({});
Basic.args = {
  theme: 'light',
  nzShape: 'circle',
  nzSize: 50,
  nzGap: 4,
  nzText: 'UV',
  user: 'User Name',
  title: 'Developer'
}
Basic.parameters = {
  docs: { inlineStories: true, }
}
