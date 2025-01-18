import { action as brokenAction } from '@storybook/addon-actions';
import React, { BaseSyntheticEvent, useEffect } from 'react';
import ColorSchemeProvider from '../packages/core/src/components/color-scheme-provider/ColorSchemeProvider';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
        default: 'light',
        values: [
            { name: 'dark', value: 1 },
            { name: 'light', value: 2 },
        ],
    },
    controls: {
        expanded: true,
    },
};

export const decorators = [
    (Story, context) => {
        const colorMode = context.globals.backgrounds?.value || 0;
        const colors = {
            dark: {
                primaryColor: '#008c94',
                secondaryColor: '#698A9C',
                primaryBackgroundColor: '#121212',
                secondaryBackgroundColor: '#1E1E1E',
                primaryTextColor: '#E0E0E0',
                secondaryTextColor: '#B0B0B0',
            },
            light: {
                primaryColor: '#008c94',
                secondaryColor: '#698A9C',
                primaryBackgroundColor: '#FFFFFF',
                secondaryBackgroundColor: '#E5E5E5',
                primaryTextColor: '#000000',
                secondaryTextColor: '#555555',
            },
        };

        useEffect(() => {
            if (colorMode === 0) {
                document.body.style.backgroundColor = '#121212';
            } else {
                document.body.style.backgroundColor = '#FFFFFF';
            }
        }, [colorMode]);

        // region fix SyntheticEvents of React
        // This could be removed when the issue https://github.com/storybookjs/storybook/issues/6471 is fixed
        const action: typeof brokenAction = (name, options) => {
            const constructedAction = brokenAction(name, options);

            return (...args: (BaseSyntheticEvent | any)[]) => {
                const fixedArgs = args.map((arg) => {
                    if (!arg || typeof arg !== 'object' || !('type' in arg)) {
                        return arg;
                    }

                    return {
                        altKey: arg.altKey,
                        clientX: arg.clientX,
                        clientY: arg.clientY,
                        ctrlKey: arg.ctrlKey,
                        innerText: arg.type === 'input' ? arg.target.innerText : undefined,
                        metaKey: arg.metaKey,
                        movementX: arg.movementX,
                        movementY: arg.movementY,
                        pageX: arg.pageX,
                        pageY: arg.pageY,
                        screenX: arg.screenX,
                        screenY: arg.screenY,
                        shiftKey: arg.shiftKey,
                        type: arg.type,
                        value: arg.type === 'change' ? arg.target.value : undefined,
                    };
                });

                return constructedAction(...fixedArgs);
            };
        };

        if (context.parameters.actions.argTypesRegex) {
            const regex = new RegExp(context.parameters.actions.argTypesRegex);

            Object.keys(context.args).forEach((key) => {
                if (!key.match(regex)) {
                    return;
                }

                context.args[key] = action(key);
            });
        }
        // endregion

        return (
            <div style={{ maxWidth: '556px' }}>
                <ColorSchemeProvider colorMode={colorMode} colors={colors}>
                    <Story />
                </ColorSchemeProvider>
            </div>
        );
    },
];
