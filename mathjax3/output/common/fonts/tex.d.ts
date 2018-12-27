import { FontData } from '../FontData.js';
import { StyleList } from '../../common/CssStyles.js';
import { StringMap } from '../Wrapper.js';
export declare class CommonTeXFont extends FontData {
    protected static defaultVariants: string[][];
    protected static defaultVariantClasses: StringMap;
    protected static defaultSizeVariants: string[];
    readonly styles: StyleList;
    protected em(n: number): string;
    protected em0(n: number): string;
}
