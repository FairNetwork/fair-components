import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, ColorMode, ColorSchemeProvider, Section } from '../src';

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

const meta: Meta<typeof ColorSchemeProvider> = {
    title: 'Foundation/ColorSchemeProvider',
    component: ColorSchemeProvider,
    args: {
        colors,
        colorMode: ColorMode.Light,
    },
    render: (args) => {
        const palette = args.colorMode === ColorMode.Light ? args.colors.light : args.colors.dark;

        return (
            <ColorSchemeProvider {...args}>
                <Section backgroundColor={palette.secondaryBackgroundColor} textColor={palette.primaryTextColor}>
                    <h2>Color Aware Layout</h2>
                    <p>
                        Components inside the provider automatically consume theme tokens via
                        Linaria&apos;s ThemeProvider and access generated CSS variables.
                    </p>
                    <Card badgeText="Live" buttonText="Join" onButtonClick={() => undefined}>
                        Create vibrant UI elements that respect the active color mode.
                    </Card>
                </Section>
            </ColorSchemeProvider>
        );
    },
};

export default meta;

type Story = StoryObj<typeof ColorSchemeProvider>;

export const LightMode: Story = {};

export const DarkMode: Story = {
    args: {
        colorMode: ColorMode.Dark,
    },
};
