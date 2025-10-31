import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import App from "../src/App";

const meta: Meta<typeof App> = {
    title: 'Core/Toggle',
    component: App,
    args: {
    },
    render: () => {

        return (
            <App />
        );
    },
};

export default meta;

type Story = StoryObj<typeof App>;

export const LightMode: Story = {};

