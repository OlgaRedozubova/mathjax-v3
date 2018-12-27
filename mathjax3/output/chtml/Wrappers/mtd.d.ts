import { CHTMLWrapper } from '../Wrapper.js';
import { StyleList } from '../../common/CssStyles.js';
export declare class CHTMLmtd<N, T, D> extends CHTMLWrapper<N, T, D> {
    static kind: string;
    static styles: StyleList;
    toCHTML(parent: N): void;
}
