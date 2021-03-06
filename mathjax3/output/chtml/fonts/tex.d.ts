import { CHTMLFontData, CHTMLCharOptions, CHTMLVariantData, CHTMLDelimiterData, DelimiterMap, CharMapMap, FontDataClass } from '../FontData.js';
import { StringMap } from '../Wrapper.js';
declare const TeXFont_base: FontDataClass<CHTMLCharOptions, CHTMLVariantData, CHTMLDelimiterData> & typeof CHTMLFontData;
export declare class TeXFont extends TeXFont_base {
    protected static defaultVariantClasses: StringMap;
    protected static defaultDelimiters: DelimiterMap<CHTMLDelimiterData>;
    protected static defaultChars: CharMapMap<CHTMLCharOptions>;
    protected static defaultStyles: {
        '.MJX-TEX .mjx-n mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-i mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-b mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-b.mjx-i mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-cal mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-cal.mjx-b mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-ds mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-fr mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-fr.mjx-b mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-sc mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-sc.mjx-b mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-ss mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-ss.mjx-b mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-ss.mjx-i mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-ss.mjx-b.mjx-i mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-ty mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-var mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-os mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-os.mjx-b mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-mit mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-lop mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-sop mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-s3 mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX .mjx-s4 mjx-c': {
            'font-family': string;
        };
        '.MJX-TEX': {
            'font-family': string;
        };
        '.MJX-TEX mjx-stretchy-v mjx-c, .MJX-TEX mjx-stretchy-h mjx-c': {
            'font-family': string;
        };
    };
    protected static defaultFonts: {
        '@font-face /* 1 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 2 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 3 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 4 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 5 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 6 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 7 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 8 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 9 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 10 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 11 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 12 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 13 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 14 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 15 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 16 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 17 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 18 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 19 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 20 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 21 */': {
            'font-family': string;
            src: string;
        };
        '@font-face /* 0 */': {
            'font-family': string;
            src: string;
        };
    };
}
