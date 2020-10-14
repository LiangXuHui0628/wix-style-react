import * as React from 'react';

export interface ThemeInterface {
  className?: string;
  icons?: {
    CloseButton?: {
      small?: React.FC,
      medium?: React.FC,
      large?: React.FC,
    },
    BaseModalLayout?: {
      HeloButton?: React.FC,
    }
  },
  componentWrapper?: ({children}: {children: React.ReactNode}) => React.ReactNode;
  color00?: React.CSSProperties['color'];
  color05?: React.CSSProperties['color'];
  color10?: React.CSSProperties['color'];
  color20?: React.CSSProperties['color'];
  color30?: React.CSSProperties['color'];
  color40?: React.CSSProperties['color'];
  color50?: React.CSSProperties['color'];
  color60?: React.CSSProperties['color'];
  textColorPrimary?: React.CSSProperties['color'];
  textColorSecondary?: React.CSSProperties['color'];
  textColorPrimaryLight?: React.CSSProperties['color'];
  textColorSecondaryLight?: React.CSSProperties['color'];
  dividerColor?: React.CSSProperties['color'];
}

export interface ThemeProviderProps {
  dataHook?: string;
  theme?: ThemeInterface;
}

export default class ThemeProvider extends React.PureComponent<
  ThemeProviderProps
> {}
