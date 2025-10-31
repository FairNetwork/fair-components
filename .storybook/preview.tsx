import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';

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
            toolbar: {
                title: 'Color mode',
                items: [
                ],
            },
        },
    },
    decorators: [
        (Story, context) => {

            return (
                    <div style={{ minHeight: '100vh', padding: 24 }}>
                        <Story />
                    </div>
            );
        },
    ],
};

export default preview;
