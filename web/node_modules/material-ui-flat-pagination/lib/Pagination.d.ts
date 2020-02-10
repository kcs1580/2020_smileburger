import * as React from 'react';
import { PropTypes, StandardProps } from '@material-ui/core';
import { PageButtonClassKey } from './PageButton';
export declare type PaginationClassKey = PageButtonClassKey;
export interface RenderButtonProps {
    offset: number;
    page: number;
    children: React.ReactNode;
}
export interface PaginationProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>, PaginationClassKey, 'onClick'> {
    limit: number;
    offset: number;
    total: number;
    centerRipple?: boolean;
    component?: string | React.ComponentType<Partial<PaginationProps>>;
    currentPageColor?: PropTypes.Color;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    innerButtonCount?: number;
    nextPageLabel?: React.ReactNode;
    onClick?: (ev: React.MouseEvent<HTMLElement>, offset: number, page: number) => void;
    renderButton?: (props: RenderButtonProps) => React.ReactElement;
    otherPageColor?: PropTypes.Color;
    outerButtonCount?: number;
    previousPageLabel?: React.ReactNode;
    reduced?: boolean;
    size?: 'small' | 'medium' | 'large';
}
declare const PaginationWithStyles: React.ComponentType<PaginationProps>;
export default PaginationWithStyles;
