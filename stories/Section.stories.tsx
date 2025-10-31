import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ColorMode, ColorSchemeProvider, Section } from '../src';

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

const meta: Meta<typeof Section> = {
    title: 'Layout/Section',
    component: Section,
    decorators: [
        (Story) => (
            <ColorSchemeProvider colors={colors} colorMode={ColorMode.Light}>
                <Story />
            </ColorSchemeProvider>
        ),
    ],
    args: {
        backgroundColor: colors.light.secondaryBackgroundColor,
        textColor: colors.light.primaryTextColor,
        children: (
            <>
                <h3>Flexible Section</h3>
                <p>
                    Sections give structure to application layouts while consuming the ambient theme
                    tokens provided by the ColorSchemeProvider.
                </p>
            </>
        ),
    },
};

export default meta;

type Story = StoryObj<typeof Section>;

export const Default: Story = {};

export const DarkMode: Story = {
    decorators: [
        (Story) => (
            <ColorSchemeProvider colors={colors} colorMode={ColorMode.Dark}>
                <Story />
            </ColorSchemeProvider>
        ),
    ],
    args: {
        backgroundColor: colors.dark.secondaryBackgroundColor,
        textColor: colors.dark.primaryTextColor,
    },
};
