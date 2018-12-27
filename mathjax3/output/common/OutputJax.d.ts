import { AbstractOutputJax } from '../../core/OutputJax.js';
import { MathDocument } from '../../core/MathDocument.js';
import { MathItem, Metrics } from '../../core/MathItem.js';
import { MmlNode } from '../../core/MmlTree/MmlNode.js';
import { FontData, FontDataClass } from './FontData.js';
import { OptionList } from '../../util/Options.js';
import { CssStyles } from './CssStyles.js';
import { CommonWrapper } from './Wrapper.js';
import { CommonWrapperFactory } from './WrapperFactory.js';
export declare type MetricMap<N> = Map<N, Metrics>;
export declare abstract class CommonOutputJax<N, T, D, W extends CommonWrapper<any, any, any>, F extends CommonWrapperFactory<any, any, any>> extends AbstractOutputJax<N, T, D> {
    static NAME: string;
    static OPTIONS: OptionList;
    cssStyles: CssStyles;
    document: MathDocument<N, T, D>;
    math: MathItem<N, T, D>;
    font: FontData;
    factory: F;
    nodeMap: Map<MmlNode, W>;
    testNodes: N;
    constructor(options?: OptionList, defaultFactory?: typeof CommonWrapperFactory, defaultFont?: FontDataClass);
    typeset(math: MathItem<N, T, D>, html: MathDocument<N, T, D>): N;
    protected createNode(): N;
    protected setScale(node: N): void;
    toDOM(math: MathItem<N, T, D>, node: N, html?: MathDocument<N, T, D>): void;
    protected abstract processMath(math: MmlNode, node: N): void;
    getBBox(math: MathItem<N, T, D>, html: MathDocument<N, T, D>): any;
    getMetrics(html: MathDocument<N, T, D>): void;
    protected getMetricMap(html: MathDocument<N, T, D>): Map<N, Metrics>;
    protected getTestElement(node: N): N;
    protected measureMetrics(node: N): Metrics;
    styleSheet(html: MathDocument<N, T, D>): N;
    protected addClassStyles(CLASS: typeof CommonWrapper): void;
    protected setDocument(html: MathDocument<N, T, D>): void;
    html(type: string, def?: OptionList, content?: (N | T)[], ns?: string): N;
    text(text: string): T;
}
