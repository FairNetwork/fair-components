import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import { ColorMode, ColorSchemeProvider, Theme} from '../src';

export const theme: Theme = {
    [ColorMode.Light]: {
        background: "#ffffff",
        primary: "#03DAC5",
        secondary: "#1E1E1E",
        accent: "#BB86FC",
        text: "#000000",
    },
    [ColorMode.Dark]: {
        background: "#121212",
        primary: "#03DAC5",
        secondary: "#1E1E1E",
        accent: "#BB86FC",
        text: "#E0E0E0",
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
            const palette = theme[colorMode];

            useEffect(() => {
                document.body.style.backgroundColor = palette.background;
                document.body.style.color = palette.text;
            }, [palette.background, palette.text]);

            return (
                <ColorSchemeProvider theme={theme} colorMode={colorMode}>
                    <div style={{ minHeight: '100vh', padding: 24 }}>
                        <Story />
                    </div>
                </ColorSchemeProvider>
            );
        },
    ],
};

export default preview;
