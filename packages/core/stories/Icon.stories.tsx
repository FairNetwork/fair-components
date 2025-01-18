import { Meta, StoryObj } from '@storybook/react';
import Icon from '../src/components/icon/Icon';

const meta: Meta<typeof Icon> = {
    title: 'Core/Icon',
    // @ts-ignore
    component: Icon,
    args: {},
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const General: Story = {
    args: {},
};
