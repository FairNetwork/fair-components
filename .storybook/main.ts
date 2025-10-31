import linaria from '@linaria/vite';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
                measure: false,
                outline: false,
                toolbars: false,
            },
        },
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    viteFinal: async (config, { configType }) => {
        config.plugins = config.plugins ?? [];
        config.plugins.push(
            linaria({
                include: ['**/*.ts', '**/*.tsx'],
                sourceMap: configType === 'DEVELOPMENT',
            })
        );

        return config;
    },
};

export default config;
