import { CharMap, CharOptions, CharData, VariantData, DelimiterData, FontData } from '../common/FontData.js';
import { StringMap } from './Wrapper.js';
import { StyleList } from '../common/CssStyles.js';
import { OptionList } from '../../util/Options.js';
export * from '../common/FontData.js';
export interface CHTMLCharOptions extends CharOptions {
    c?: string;
    f?: string;
    css?: number;
}
export declare type CHTMLCharMap = CharMap<CHTMLCharOptions>;
export declare type CHTMLCharData = CharData<CHTMLCharOptions>;
export interface CHTMLVariantData extends VariantData<CHTMLCharOptions> {
    classes?: string;
}
export interface CHTMLDelimiterData extends DelimiterData {
}
export declare const enum CSS {
    width = 1,
    padding = 2,
    content = 4,
}
export declare class CHTMLFontData extends FontData<CHTMLCharOptions, CHTMLVariantData, CHTMLDelimiterData> {
    static OPTIONS: {
        fontURL: string;
    };
    protected static defaultVariantClasses: StringMap;
    protected static defaultStyles: {};
    protected static defaultFonts: {
        '@font-face /* 0 */': {
            'font-family': string;
            src: string;
        };
    };
    protected options: OptionList;
    protected cssRoot: string;
    constructor(options?: OptionList);
    readonly styles: StyleList;
    protected addVariantChars(styles: StyleList): void;
    protected addFontURLs(styles: StyleList, fonts: StyleList, url: string): void;
    protected addDelimiterStyles(styles: StyleList, n: number, data: CHTMLDelimiterData): void;
    protected addDelimiterVStyles(styles: StyleList, c: string, data: CHTMLDelimiterData): void;
    protected addDelimiterVPart(styles: StyleList, c: string, W: number, part: string, n: number): number;
    protected addDelimiterHStyles(styles: StyleList, c: string, data: CHTMLDelimiterData): void;
    protected addDelimiterHPart(styles: StyleList, c: string, part: string, n: number, force?: boolean): number;
    protected addCharStyles(styles: StyleList, vclass: string, n: number, data: CHTMLCharData): void;
    protected getDelimiterData(n: number): CharData<CHTMLCharOptions>;
    static charOptions(font: CHTMLCharMap, n: number): CHTMLCharOptions;
    em(n: number): string;
    em0(n: number): string;
}
export declare type CHTMLFontDataClass = typeof CHTMLFontData;
export declare type CharOptionsMap = {
    [name: number]: CHTMLCharOptions;
};
export declare type CssMap = {
    [name: number]: number;
};
export declare function AddCSS(font: CHTMLCharMap, css: CssMap, options: CharOptionsMap): CharMap<CHTMLCharOptions>;
