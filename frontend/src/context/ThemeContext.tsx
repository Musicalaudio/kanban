import { createContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type Context = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<Context | null>(null);

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
