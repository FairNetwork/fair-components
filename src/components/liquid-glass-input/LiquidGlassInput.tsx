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
import { css } from '@linaria/core';
import { styled } from '@linaria/react';

export type LiquidGlassInputProps = {
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

export type LiquidGlassInputRef = HTMLInputElement & {
  clear: () => void;
  focusInput: () => void;
  setValue: (v: string) => void;
};

const Root = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  gap: 0;
  font-family: var(--lg-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
`;

const LeftActionButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  border-radius: 999px;
  margin-right: -16px;
  background: var(
    --lg-left-button-bg,
    linear-gradient(145deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.15))
  );
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(24px) saturate(1.2);
  color: var(--lg-foreground, rgba(30, 30, 30, 0.85));
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 0;
  border: none;

  &:hover {
    transform: translateX(-1px) scale(1.02);
    box-shadow: 0 18px 35px rgba(15, 23, 42, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }

  &:active {
    transform: translateX(-1px) scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-color, #0a84ff);
    outline-offset: 4px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  @media (prefers-color-scheme: dark) {
    background: var(
      --lg-left-button-bg-dark,
      linear-gradient(145deg, rgba(148, 163, 184, 0.45), rgba(71, 85, 105, 0.25))
    );
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--lg-foreground-dark, rgba(248, 250, 252, 0.85));
  }
`;

const GlassShell = styled.div`
  position: relative;
  display: inline-flex;
  align-items: stretch;
  min-height: 56px;
  border-radius: var(--lg-radius, 28px);
  padding: 4px;
  overflow: hidden;
  background: var(
      --lg-surface,
      radial-gradient(circle at top left, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.1))
    )
    rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    inset 0 -1px 0 rgba(255, 255, 255, 0.2),
    0 20px 50px rgba(15, 23, 42, 0.18);
  backdrop-filter: blur(24px) saturate(1.2);
  color: var(--lg-foreground, rgba(35, 35, 35, 0.9));
  width: 100%;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus-within {
    border-color: var(--accent-color, #0a84ff);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -1px 0 rgba(255, 255, 255, 0.25),
      0 24px 60px color-mix(in srgb, var(--accent-color, #0a84ff) 35%, transparent);
  }

  &[data-warning='true'] {
    border-color: var(--color-warning, #ffd60a);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -1px 0 rgba(255, 214, 10, 0.2),
      0 22px 58px rgba(255, 214, 10, 0.28);
  }

  &[data-invalid='true'] {
    border-color: var(--color-invalid, #ff3b30);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -1px 0 rgba(255, 59, 48, 0.2),
      0 22px 58px rgba(255, 59, 48, 0.3);
  }

  &[data-disabled='true'] {
    opacity: 0.6;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 rgba(255, 255, 255, 0.12),
      0 12px 28px rgba(15, 23, 42, 0.12);
  }

  @media (prefers-color-scheme: dark) {
    background: var(
        --lg-surface-dark,
        radial-gradient(circle at top left, rgba(30, 41, 59, 0.65), rgba(15, 23, 42, 0.4))
      )
      rgba(15, 23, 42, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: var(--lg-foreground-dark, rgba(248, 250, 252, 0.9));
  }
`;

const InputFrame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 56px 0 22px;
  z-index: 1;
`;

const InputElement = styled.input`
  appearance: none;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 17px;
  line-height: 1.4;
  padding: 0;
  width: 100%;
  min-width: 0;
  outline: none;
  caret-color: var(--accent-color, #0a84ff);

  &::placeholder {
    color: var(--lg-placeholder, rgba(45, 45, 45, 0.55));
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: dark) {
    &::placeholder {
      color: var(--lg-placeholder-dark, rgba(226, 232, 240, 0.55));
    }
  }
`;

const RightActionButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--lg-foreground, rgba(35, 35, 35, 0.92));
  background: color-mix(in srgb, var(--right-action-color, var(--accent-color, #0a84ff)) 18%, transparent);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1),
    0 8px 18px rgba(10, 132, 255, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  padding: 0;
  z-index: 1;

  &:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 rgba(0, 0, 0, 0.18),
      0 10px 20px rgba(10, 132, 255, 0.28);
  }

  &:active {
    transform: translateY(-50%) scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-color, #0a84ff);
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--lg-foreground-dark, rgba(248, 250, 252, 0.9));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 rgba(15, 23, 42, 0.55),
      0 8px 18px rgba(15, 118, 255, 0.25);
  }
`;

const BorderOverlay = styled.svg`
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  z-index: 0;
`;

const borderAnimation = css`
  @keyframes lgBorderWave {
    0% {
      stroke-dasharray: 0 0.5 0 0.5;
      stroke-dashoffset: 0.5;
      opacity: 0.6;
    }
    60% {
      stroke-dasharray: 0.5 0 0.5 0;
      stroke-dashoffset: 0;
      opacity: 1;
    }
    100% {
      stroke-dasharray: 1 0 1 0;
      stroke-dashoffset: 0;
      opacity: 0;
    }
  }
`;

const BorderPath = styled.path`
  stroke-width: 2;
  fill: transparent;
  stroke: var(--border-anim-color, var(--accent-color, #0a84ff));
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  stroke-dasharray: 0 1;
  stroke-dashoffset: 0.5;
  transform: translateZ(0);

  &[data-animate='true'] {
    opacity: 1;
    animation: lgBorderWave 0.9s ease forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    opacity: 1 !important;
    stroke-dasharray: 1 0 1 0 !important;
    stroke-dashoffset: 0 !important;
  }
`;

const useThemeVariables = (accentColor?: string, danger?: boolean, warn?: boolean) => {
  return useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {
      '--accent-color': accentColor ?? 'var(--color-accent, #0a84ff)',
      '--border-anim-color': accentColor ?? 'var(--color-accent, #0a84ff)',
    } as React.CSSProperties;

    if (danger) {
      style['--border-anim-color'] = 'var(--color-invalid, #ff3b30)';
    } else if (warn) {
      style['--border-anim-color'] = 'var(--color-warning, #ffd60a)';
    }

    return style;
  }, [accentColor, danger, warn]);
};

const PlusIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M10 3.25a.75.75 0 0 1 .75.75v5.25H16a.75.75 0 0 1 0 1.5h-5.25V16a.75.75 0 0 1-1.5 0v-5.25H4a.75.75 0 0 1 0-1.5h5.25V4a.75.75 0 0 1 .75-.75Z"
      fill="currentColor"
    />
  </svg>
);

const PaperPlaneIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M17.72 2.28a.75.75 0 0 0-.77-.17l-14 5a.75.75 0 0 0-.07 1.38l4.92 2.57 2.56 4.92a.75.75 0 0 0 1.38-.07l5-14a.75.75 0 0 0-.17-.76ZM6.6 10.63 4.1 9.33l10.77-3.85-8.27 5.15Z"
      fill="currentColor"
    />
  </svg>
);

const iconLibrary = {
  plus: <PlusIcon />,
  plane: <PaperPlaneIcon />,
};

const LiquidGlassInput = React.forwardRef<LiquidGlassInputRef, LiquidGlassInputProps>(
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
      style,
      accentColor,
      disabled,
    },
    forwardedRef: ForwardedRef<LiquidGlassInputRef>,
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');
    const inputRef = useRef<HTMLInputElement>(null);
    const [focused, setFocused] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    const value = isControlled ? valueProp! : internalValue;
    const reachedMax = maxLength !== undefined && value.length >= maxLength;
    const nearMax =
      !reachedMax && maxLength !== undefined && value.length === Math.max(maxLength - 1, 0);

    const computedInvalid = invalid || reachedMax;
    const computedWarning = !computedInvalid && (warning || nearMax);

    useEffect(() => {
      setAnimationKey((prev) => prev + 1);
    }, [computedInvalid, computedWarning, focused]);

    const variableStyle = useThemeVariables(accentColor, computedInvalid, computedWarning);
    const combinedStyle = useMemo<React.CSSProperties>(
      () => ({
        ...variableStyle,
        ...style,
      }),
      [style, variableStyle],
    );

    const handleChange = useCallback(
      (ev: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalValue(ev.target.value);
        }
        onChange?.(ev.target.value, ev);
      },
      [isControlled, onChange],
    );

    const handleKeyDown = useCallback(
      (ev: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(ev);
      },
      [onKeyDown],
    );

    useImperativeHandle(
      forwardedRef,
      () => {
        const node = inputRef.current as LiquidGlassInputRef | null;
        if (!node) {
          return {
            clear: () => undefined,
            focusInput: () => undefined,
            setValue: () => undefined,
          } as LiquidGlassInputRef;
        }

        return Object.assign(node, {
          clear: () => {
            if (!isControlled) {
              setInternalValue('');
            }
            node.value = '';
          },
          focusInput: () => {
            node.focus();
          },
          setValue: (v: string) => {
            if (!isControlled) {
              setInternalValue(v);
            }
            node.value = v;
          },
        });
      },
      [isControlled],
    );

    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);

    const currentRightActionColor = rightAction?.accentColor ?? accentColor;

    return (
      <Root className={className} style={combinedStyle} data-disabled={disabled ? 'true' : undefined}>
        {leftAction ? (
          <LeftActionButton
            type="button"
            aria-label={leftAction.ariaLabel}
            onClick={leftAction.onClick}
            disabled={disabled}
          >
            {leftAction.icon ?? iconLibrary.plus}
          </LeftActionButton>
        ) : null}
        <GlassShell
          data-invalid={computedInvalid ? 'true' : undefined}
          data-warning={computedWarning ? 'true' : undefined}
          data-disabled={disabled ? 'true' : undefined}
        >
          <BorderOverlay viewBox="0 0 100 100" preserveAspectRatio="none" className={borderAnimation}>
            <BorderPath
              d="M5 20 Q5 5 20 5 L80 5 Q95 5 95 20 L95 80 Q95 95 80 95 L20 95 Q5 95 5 80 Z"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              data-animate={(computedInvalid || computedWarning || focused) && !disabled ? 'true' : 'false'}
              key={animationKey}
            />
          </BorderOverlay>
          <InputFrame>
            <InputElement
              ref={inputRef}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-invalid={computedInvalid || undefined}
              disabled={disabled}
            />
            {rightAction ? (
              <RightActionButton
                type="button"
                aria-label={rightAction.ariaLabel}
                onClick={rightAction.onClick}
                disabled={disabled}
                style={{
                  '--right-action-color': currentRightActionColor ?? 'var(--accent-color, #0a84ff)',
                } as React.CSSProperties}
              >
                {rightAction.icon ?? iconLibrary.plane}
              </RightActionButton>
            ) : null}
          </InputFrame>
        </GlassShell>
      </Root>
    );
  },
);

LiquidGlassInput.displayName = 'LiquidGlassInput';

export { iconLibrary };
export default LiquidGlassInput;
