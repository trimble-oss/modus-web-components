import { ModusButton } from '@trimble-oss/modus-react-components';
import { useState, createContext } from 'react';

export const ThemeContext = createContext<string | null | undefined>(null);

const ThemeToggle: React.FunctionComponent<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  const [theme, setTheme] = useState<string | null>();
  return (
    <>
      <div style={{ padding: '10px' }}>
        <ModusButton
          color="primary"
          id="toggle_accordion-item"
          onClick={() =>
            setTheme(!theme || theme === 'light' ? 'dark' : 'light')
          }>
          {title}
        </ModusButton>
      </div>
      <div style={{ padding: '10px' }}>
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
      </div>
    </>
  );
};

export default ThemeToggle;
