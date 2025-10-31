import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Badge,
  Button,
  Checkbox,
  ContextMenu,
  FilterChips,
  GlassThemeProvider,
  Input,
  Popup,
  Slider,
  Toggle,
  Toolbar,
} from './index';

const Page = styled.div`
  min-height: 100vh;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  background: radial-gradient(circle at 15% 15%, rgba(120, 200, 255, 0.22), transparent 55%),
    radial-gradient(circle at 85% 35%, rgba(255, 120, 200, 0.18), transparent 55%),
    linear-gradient(180deg, rgba(10, 18, 36, 0.92) 0%, rgba(8, 12, 22, 0.94) 100%);
`;

const Section = styled.section`
  width: min(960px, 100%);
  border-radius: 32px;
  padding: 2rem;
  display: grid;
  gap: 1.5rem;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 40px 80px -48px rgba(0, 0, 0, 0.6);
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  color: rgba(240, 247, 255, 0.95);
  font-size: 2.25rem;
  text-align: center;
`;

const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(240, 247, 255, 0.8);
`;

const ContextMenuAnchor = styled.button`
  border: none;
  border-radius: 18px;
  padding: 0.9rem 1.35rem;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(240, 247, 255, 0.94);
  cursor: pointer;
`;

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [toggleOn, setToggleOn] = useState(true);
  const [sliderValue, setSliderValue] = useState(50);
  const [checked, setChecked] = useState(true);
  const [inputValue, setInputValue] = useState('Liquid glass');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['winter']);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setMenuOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      { id: 'edit', label: 'Edit', icon: '✏️', onSelect: () => setPopupOpen(true) },
      { id: 'duplicate', label: 'Duplicate', icon: '🧬', onSelect: () => undefined },
      { id: 'delete', label: 'Delete', icon: '🗑️', onSelect: () => undefined, disabled: false },
    ],
    [setPopupOpen],
  );

  return (
    <GlassThemeProvider initialMode={mode}>
      <Page>
        <Title>Liquid Glass Component Playground</Title>
        <ThemeToggle>
          <span>Dark Mode</span>
          <Toggle isOn={mode === 'dark'} onToggle={(isOn) => setMode(isOn ? 'dark' : 'light')} />
        </ThemeToggle>
          <Row>
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" icon={<span role="img" aria-label="sparkles">✨</span>}>
              With Icon
            </Button>
            <Badge value={13} tone="accent" />
          </Row>
          <Row>
            <Input
              id="demo-input"
              label="Search"
              placeholder="Type something"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              helperText="Animated border highlights when nearing the limit"
              maxLength={20}
              rightAction={<span role="img" aria-hidden>🔍</span>}
              rightActionAriaLabel="Submit search"
            />
          </Row>
          <Row>
            <Toggle isOn={toggleOn} onToggle={setToggleOn} label="Toggle me" />
            <Slider label="Intensity" value={sliderValue} onChange={(next) => setSliderValue(next)} />
            <Checkbox label="Accept" checked={checked} onChange={(next) => setChecked(next)} />
          </Row>
          <Row>
            <FilterChips
              options={[
                { id: 'all', label: 'All', value: 'all', icon: '🌈' },
                { id: 'summer', label: 'Summer', value: 'summer', icon: '🌞' },
                { id: 'winter', label: 'Winter', value: 'winter', icon: '❄️' },
              ]}
              selectedValues={selectedFilters}
              onChange={setSelectedFilters}
            />
          </Row>
          <Row>
            <ContextMenuAnchor
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setMenuPosition({ x: rect.left, y: rect.bottom + 8 });
                setMenuOpen(true);
              }}
            >
              Open Context Menu
            </ContextMenuAnchor>
            <Button onClick={() => setPopupOpen(true)}>Open Popup</Button>
          </Row>
        <Toolbar
          ariaLabel="Quick actions"
          actions={[
            { id: 'home', label: 'Home', icon: '🏠', onPress: () => undefined, isActive: true },
            { id: 'search', label: 'Search', icon: '🔍', onPress: () => undefined },
            { id: 'settings', label: 'Settings', icon: '⚙️', onPress: () => undefined },
          ]}
        />
        <Popup
          isOpen={isPopupOpen}
          title="Liquid Glass Popup"
          description="This popup showcases the frosted glass dialog with smooth spring-in animation."
          onClose={() => setPopupOpen(false)}
          actions={[
            {
              id: 'later',
              label: 'Later',
              onPress: () => undefined,
              variant: 'secondary',
            },
            {
              id: 'continue',
              label: 'Continue',
              onPress: () => undefined,
              variant: 'primary',
            },
          ]}
        >
          Effortlessly blend vibrant colors with glassy translucency to achieve a futuristic interface.
        </Popup>
        <ContextMenu
          items={menuItems}
          isOpen={isMenuOpen}
          position={menuPosition}
          onRequestClose={() => setMenuOpen(false)}
        />
      </Page>
    </GlassThemeProvider>
  );
};

export default App;

