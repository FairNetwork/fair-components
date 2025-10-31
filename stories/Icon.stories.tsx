import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Icon } from '../src';

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    args: {
        icon: 'fa-solid fa-star',
        color: '#f59e0b',
        size: '32px',
    },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const Interactive: Story = {
    args: {
        icon: 'fa-solid fa-heart',
        color: '#ef4444',
    },
    render: (args) => (
        <Icon
            {...args}
            onClick={() => {
                // eslint-disable-next-line no-alert
                alert('Icon clicked');
            }}
        />
    ),
};
