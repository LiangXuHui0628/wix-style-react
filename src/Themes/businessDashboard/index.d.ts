import { ThemeInterface } from '../../ThemeProvider';

export interface ThemeOptions {
  active?: boolean;
}

export function theme(options?: ThemeOptions): ThemeInterface;
