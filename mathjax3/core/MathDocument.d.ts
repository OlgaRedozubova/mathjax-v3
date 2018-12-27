import { OptionList } from '../util/Options.js';
import { InputJax } from './InputJax.js';
import { OutputJax } from './OutputJax.js';
import { MathList } from './MathList.js';
import { MathItem } from './MathItem.js';
import { DOMAdaptor } from '../core/DOMAdaptor.js';
export interface MathDocument<N, T, D> {
    document: D;
    kind: string;
    options: OptionList;
    math: MathList<N, T, D>;
    processed: {
        [name: string]: boolean;
    };
    inputJax: InputJax<N, T, D>[];
    outputJax: OutputJax<N, T, D>;
    adaptor: DOMAdaptor<N, T, D>;
    findMath(options?: OptionList): MathDocument<N, T, D>;
    compile(): MathDocument<N, T, D>;
    getMetrics(): MathDocument<N, T, D>;
    typeset(): MathDocument<N, T, D>;
    updateDocument(): MathDocument<N, T, D>;
    removeFromDocument(restore?: boolean): MathDocument<N, T, D>;
    state(state: number, restore?: boolean): MathDocument<N, T, D>;
    reset(): MathDocument<N, T, D>;
    clear(): MathDocument<N, T, D>;
    concat(list: MathList<N, T, D>): MathDocument<N, T, D>;
}
export declare type MathProcessed = {
    findMath: boolean;
    compile: boolean;
    getMetrics: boolean;
    typeset: boolean;
    updateDocument: boolean;
    [name: string]: boolean;
};
export declare abstract class AbstractMathDocument<N, T, D> implements MathDocument<N, T, D> {
    static KIND: string;
    static OPTIONS: OptionList;
    static STATE: {
        UNPROCESSED: number;
        COMPILED: number;
        TYPESET: number;
        INSERTED: number;
    };
    document: D;
    options: OptionList;
    math: MathList<N, T, D>;
    processed: MathProcessed;
    inputJax: InputJax<N, T, D>[];
    outputJax: OutputJax<N, T, D>;
    adaptor: DOMAdaptor<N, T, D>;
    constructor(document: any, adaptor: DOMAdaptor<N, T, D>, options: OptionList);
    readonly kind: string;
    findMath(options?: OptionList): this;
    compile(): this;
    compileError(math: MathItem<N, T, D>, err: Error): void;
    typeset(): this;
    typesetError(math: MathItem<N, T, D>, err: Error): void;
    getMetrics(): this;
    updateDocument(): this;
    removeFromDocument(restore?: boolean): this;
    state(state: number, restore?: boolean): this;
    reset(): this;
    clear(): this;
    concat(list: MathList<N, T, D>): this;
}
