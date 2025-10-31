import React, {
    ChangeEvent,
    ForwardedRef,
    KeyboardEvent,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    StyledInputRoot,
    StyledInputLeftAction,
    StyledInputShell,
    StyledInputFrame,
    StyledInputElement,
    StyledInputRightAction,
    StyledInputBorderOverlay,
    StyledInputBorderPath,
} from './Input.styles';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export type InputProps = {
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string, ev: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (ev: KeyboardEvent<HTMLInputElement>) => void;
    leftAction?: { icon: React.ReactNode; onClick?: () => void; ariaLabel?: string };
    rightAction?: {
        icon: React.ReactNode;
        onClick?: () => void;
        ariaLabel?: string;
        accentColor?: string;
    };
    invalid?: boolean;
    warning?: boolean;
    maxLength?: number;
    className?: string;
    style?: React.CSSProperties;
    accentColor?: string;
    disabled?: boolean;
};

export type InputRef = HTMLInputElement & {
    clear: () => void;
    focusInput: () => void;
    setValue: (v: string) => void;
};

const Input = React.forwardRef<InputRef, InputProps>(
    (
        {
            placeholder,
            value: valueProp,
            defaultValue,
            onChange,
            onKeyDown,
            leftAction,
            rightAction,
            invalid,
            warning,
            maxLength,
            className,
            accentColor,
            disabled,
        },
        forwardedRef: ForwardedRef<InputRef>,
    ) => {
        const isControlled = valueProp !== undefined;
        const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');
        const inputRef = useRef<HTMLInputElement>(null);
        const [focused, setFocused] = useState(false);
        const [animationKey, setAnimationKey] = useState(0);
        const prefersReducedMotion = usePrefersReducedMotion();

        const value = isControlled ? valueProp! : internalValue;
        const reachedMax = maxLength !== undefined && value.length >= maxLength;
        const nearMax =
            !reachedMax && maxLength !== undefined && value.length === Math.max(maxLength - 1, 0);

        const computedInvalid = invalid || reachedMax;
        const computedWarning = !computedInvalid && (warning || nearMax);

        useEffect(() => {
            setAnimationKey((prev) => prev + 1);
        }, [computedInvalid, computedWarning, focused]);

        const shellStyle = useMemo<React.CSSProperties>(() => {
            const style: React.CSSProperties = {};

            if (accentColor) {
                style['--accent-color' as const] = accentColor;
                style['--border-anim-color' as const] = accentColor;
            }

            if (computedInvalid) {
                style['--border-anim-color' as const] = 'var(--color-invalid, #ff3b30)';
            } else if (computedWarning) {
                style['--border-anim-color' as const] = 'var(--color-warning, #ffd60a)';
            }

            return style;
        }, [accentColor, computedInvalid, computedWarning]);

        const shouldAnimateBorder =
            (computedInvalid || computedWarning || focused) && !disabled && !prefersReducedMotion;

        const borderAnimation = useMemo(() => {
            if (!shouldAnimateBorder) {
                return {
                    initial: {
                        opacity: 0,
                        strokeDasharray: '0 1',
                        strokeDashoffset: 0.5,
                    },
                    animate: {
                        opacity: 0,
                        strokeDasharray: '0 1',
                        strokeDashoffset: 0.5,
                    },
                    transition: { duration: 0.2 },
                } as const;
            }

            return {
                initial: {
                    opacity: 0.6,
                    strokeDasharray: '0 0.5 0 0.5',
                    strokeDashoffset: 0.5,
                },
                animate: {
                    opacity: [0.6, 1, 0],
                    strokeDasharray: ['0 0.5 0 0.5', '0.5 0 0.5 0', '1 0 1 0'],
                    strokeDashoffset: [0.5, 0, 0],
                },
                transition: { duration: 0.9, ease: 'easeInOut' },
            } as const;
        }, [shouldAnimateBorder]);

        const handleChange = useCallback(
            (ev: ChangeEvent<HTMLInputElement>) => {
                if (!isControlled) setInternalValue(ev.target.value);
                onChange?.(ev.target.value, ev);
            },
            [isControlled, onChange],
        );

        const handleKeyDown = useCallback(
            (ev: KeyboardEvent<HTMLInputElement>) => onKeyDown?.(ev),
            [onKeyDown],
        );

        useImperativeHandle(
            forwardedRef,
            () => {
                const node = inputRef.current as InputRef | null;
                if (!node) {
                    return { clear() {}, focusInput() {}, setValue() {} } as InputRef;
                }
                return Object.assign(node, {
                    clear: () => {
                        if (!isControlled) setInternalValue('');
                        node.value = '';
                    },
                    focusInput: () => node.focus(),
                    setValue: (v: string) => {
                        if (!isControlled) setInternalValue(v);
                        node.value = v;
                    },
                });
            },
            [isControlled],
        );

        return (
            <StyledInputRoot className={className}  data-disabled={disabled || undefined}>
                {leftAction && (
                    <StyledInputLeftAction
                        type="button"
                        aria-label={leftAction.ariaLabel}
                        onClick={leftAction.onClick}
                        disabled={disabled}
                    >
                        {leftAction.icon}
                    </StyledInputLeftAction>
                )}
                <StyledInputShell
                    data-invalid={computedInvalid || undefined}
                    data-warning={computedWarning || undefined}
                    data-disabled={disabled || undefined}
                    style={shellStyle}
                >
                    <StyledInputBorderOverlay viewBox="0 0 100 100" preserveAspectRatio="none">
                        <StyledInputBorderPath
                            d="M5 20 Q5 5 20 5 L80 5 Q95 5 95 20 L95 80 Q95 95 80 95 L20 95 Q5 95 5 80 Z"
                            vectorEffect="non-scaling-stroke"
                            pathLength={1}
                            key={animationKey}
                            {...borderAnimation}
                        />
                    </StyledInputBorderOverlay>
                    <StyledInputFrame>
                        <StyledInputElement
                            ref={inputRef}
                            placeholder={placeholder}
                            value={value}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            aria-invalid={computedInvalid || undefined}
                            disabled={disabled}
                        />
                        {rightAction && (
                            <StyledInputRightAction
                                type="button"
                                aria-label={rightAction.ariaLabel}
                                onClick={rightAction.onClick}
                                disabled={disabled}
                                style={
                                    {
                                        '--right-action-color': rightAction.accentColor ?? accentColor ?? '#0a84ff',
                                    } as React.CSSProperties
                                }
                            >
                                {rightAction.icon}
                            </StyledInputRightAction>
                        )}
                    </StyledInputFrame>
                </StyledInputShell>
            </StyledInputRoot>
        );
    },
);

Input.displayName = 'Input';

export default Input;
