import Card from '../src/components/card/Card';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
    title: 'Core/Card',
    // @ts-ignore
    component: Card,
    args: {},
};

export default meta;

type Story = StoryObj<typeof Card>;

export const General: Story = {
    args: {},
};
