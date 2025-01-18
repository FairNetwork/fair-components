import { Meta, StoryObj } from '@storybook/react';
import Section from '../src/components/section/Section';

const meta: Meta<typeof Section> = {
    title: 'Core/Section',
    // @ts-ignore
    component: Section,
    args: {},
};

export default meta;

type Story = StoryObj<typeof Section>;

export const General: Story = {
    args: {
        textColor: '#FFF',
        backgroundColor: '#000',
        children: 'Test',
    },
};
