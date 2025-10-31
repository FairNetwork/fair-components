import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, ColorMode, ColorSchemeProvider } from '../src';

const colors = {
    light: {
        primaryColor: '#006adc',
        secondaryColor: '#1f2937',
        primaryBackgroundColor: '#ffffff',
        secondaryBackgroundColor: '#f3f4f6',
        primaryTextColor: '#111827',
        secondaryTextColor: '#374151',
    },
    dark: {
        primaryColor: '#4f46e5',
        secondaryColor: '#f9fafb',
        primaryBackgroundColor: '#111827',
        secondaryBackgroundColor: '#1f2937',
        primaryTextColor: '#f9fafb',
        secondaryTextColor: '#e5e7eb',
    },
};

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    decorators: [
        (Story) => (
            <ColorSchemeProvider colors={colors} colorMode={ColorMode.Light}>
                <div style={{ maxWidth: 240 }}>
                    <Story />
                </div>
            </ColorSchemeProvider>
        ),
    ],
    args: {
        badgeText: 'Featured',
        buttonText: 'View',
        children: <p>Cards are animated using the motion library for delightful entrances.</p>,
    },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const DarkMode: Story = {
    decorators: [
        (Story) => (
            <ColorSchemeProvider colors={colors} colorMode={ColorMode.Dark}>
                <div style={{ maxWidth: 240 }}>
                    <Story />
                </div>
            </ColorSchemeProvider>
        ),
    ],
};
