import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ColorMode, ColorSchemeProvider } from '../src';
import LiquidGlassInput from "@/components/liquid-glass-input";
import Input from "@/components/input/Input";

const theme = {
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
    title: 'Foundation/D',
    component: ColorSchemeProvider,
    args: {
        theme,
        colorMode: ColorMode.Light,
    },
    render: (args) => {

        return (
            <ColorSchemeProvider {...args}>
                    <h2>Color Aware Layout</h2>
                    <p>
                        Components inside the provider automatically consume theme tokens via
                        Linaria&apos;s ThemeProvider and access generated CSS variables.
                    </p>
                <Input/>
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
