import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import { ColorMode, ColorSchemeProvider } from '../src';

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

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            expanded: true,
        },
    },
    globalTypes: {
        colorMode: {
            description: 'Toggle between the light and dark color schemes',
            defaultValue: ColorMode.Light,
            toolbar: {
                title: 'Color mode',
                items: [
                    { value: ColorMode.Light, title: 'Light' },
                    { value: ColorMode.Dark, title: 'Dark' },
                ],
            },
        },
    },
    decorators: [
        (Story, context) => {
            const colorMode = context.globals.colorMode as ColorMode;
            const palette = colors[colorMode];

            useEffect(() => {
                document.body.style.backgroundColor = palette.primaryBackgroundColor;
                document.body.style.color = palette.primaryTextColor;
            }, [palette.primaryBackgroundColor, palette.primaryTextColor]);

            return (
                <ColorSchemeProvider colors={colors} colorMode={colorMode}>
                    <div style={{ minHeight: '100vh', padding: 24 }}>
                        <Story />
                    </div>
                </ColorSchemeProvider>
            );
        },
    ],
};

export default preview;
