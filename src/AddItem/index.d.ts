import * as React from 'react';
import { TooltipCommonProps } from '../common';

export interface AddItemProps {
  children?: React.ReactNode | (() => React.ReactNode);
  disabled?: boolean;
  theme?: AddItemTheme;
  alignItems?: AddItemAlignItems;
  size?: AddItemSize;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  dataHook?: string;
  className?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: TooltipCommonProps;
  showIcon?: boolean;
  removePadding?: boolean;
  borderRadius?: React.CSSProperties['borderRadius'];
}

export default class AddItem extends React.Component<AddItemProps> {}

export type AddItemTheme = 'dashes' | 'plain' | 'filled' | 'image';
export type AddItemAlignItems = 'center' | 'right' | 'left';
export type AddItemSize = 'large' | 'medium' | 'small' | 'tiny';
