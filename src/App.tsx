import React, { useRef, useState } from 'react'
import { styled } from '@linaria/react'
import LiquidGlassInput, { iconLibrary, type LiquidGlassInputRef } from './components/liquid-glass-input'

const Page = styled.div`
  min-height: 100vh;
  padding: 64px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.25), transparent 55%),
    radial-gradient(circle at 80% 30%, rgba(10, 132, 255, 0.2), transparent 55%),
    radial-gradient(circle at 50% 70%, rgba(255, 69, 58, 0.18), transparent 60%),
    #0f172a;
  color: #f8fafc;
`;

const DemoCard = styled.div`
  width: min(640px, 100%);
  border-radius: 32px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(18px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const SubHeading = styled.p`
  margin: 0;
  opacity: 0.7;
  line-height: 1.5;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ControlButton = styled.button`
  border-radius: 999px;
  padding: 10px 20px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  background: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.28);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Log = styled.pre`
  margin: 0;
  background: rgba(15, 23, 42, 0.55);
  border-radius: 18px;
  padding: 16px 20px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(226, 232, 240, 0.92);
  max-height: 180px;
  overflow: auto;
`;

const AccentSwatch = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
`;

const AccentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(248, 250, 252, 0.8);
`;

const accentChoices = [
  { label: 'Blue', value: '#0a84ff' },
  { label: 'Mint', value: '#32d74b' },
  { label: 'Pink', value: '#ff2d55' },
]

const App: React.FC = () => {
  const [controlledValue, setControlledValue] = useState('Liquid glass input ✨')
  const [accent, setAccent] = useState('#0a84ff')
  const [sentLog, setSentLog] = useState<string[]>([])
  const controlledRef = useRef<LiquidGlassInputRef>(null)
  const uncontrolledRef = useRef<LiquidGlassInputRef>(null)

  const appendLog = (entry: string) => {
    setSentLog((prev) => [entry, ...prev].slice(0, 6))
  }

  return (
    <Page>
      <Heading>LiquidGlassInput Demo</Heading>
      <DemoCard>
        <SubHeading>
          Controlled input with `maxLength` handling. Hit the plane to send the text and watch warning /
          invalid states when approaching the limit.
        </SubHeading>
        <LiquidGlassInput
          ref={controlledRef}
          value={controlledValue}
          onChange={(next) => setControlledValue(next)}
          placeholder="Compose message"
          maxLength={32}
          accentColor={accent}
          leftAction={{
            icon: iconLibrary.plus,
            ariaLabel: 'Add template',
            onClick: () => setControlledValue((prev) => `${prev} +`),
          }}
          rightAction={{
            icon: iconLibrary.plane,
            ariaLabel: 'Send message',
            accentColor: accent,
            onClick: () => {
              if (!controlledValue.trim()) {
                appendLog('Nothing to send.');
                return
              }
              appendLog(`Sent: ${controlledValue}`)
              setControlledValue('')
            },
          }}
        />
        <AccentRow>
          Accent:
          {accentChoices.map((choice) => (
            <ControlButton key={choice.value} onClick={() => setAccent(choice.value)}>
              <AccentSwatch style={{ ['--accent' as const]: choice.value }} /> {choice.label}
            </ControlButton>
          ))}
        </AccentRow>
        <ButtonRow>
          <ControlButton onClick={() => controlledRef.current?.focusInput()}>Focus controlled</ControlButton>
          <ControlButton
            onClick={() => {
              setControlledValue('')
              controlledRef.current?.clear()
            }}
          >
            Clear controlled
          </ControlButton>
        </ButtonRow>
        <Log>{sentLog.join('\n') || '📮 Sent messages appear here.'}</Log>
      </DemoCard>

      <DemoCard>
        <SubHeading>
          Uncontrolled variant using `defaultValue`. Use the helper buttons to interact with the imperative
          API exposed through the ref.
        </SubHeading>
        <LiquidGlassInput
          ref={uncontrolledRef}
          defaultValue="Tap focus to edit me"
          placeholder="Your name"
          maxLength={24}
          leftAction={{
            icon: iconLibrary.plus,
            ariaLabel: 'Clear field',
            onClick: () => uncontrolledRef.current?.clear(),
          }}
          rightAction={{
            icon: iconLibrary.plane,
            ariaLabel: 'Log value',
            onClick: () => {
              const current = uncontrolledRef.current?.value ?? ''
              appendLog(`Captured: ${current}`)
            },
          }}
        />
        <ButtonRow>
          <ControlButton onClick={() => uncontrolledRef.current?.focusInput()}>Focus uncontrolled</ControlButton>
          <ControlButton onClick={() => uncontrolledRef.current?.setValue('Linaria rocks!')}>
            Set custom value
          </ControlButton>
        </ButtonRow>
      </DemoCard>
    </Page>
  )
}

export default App
