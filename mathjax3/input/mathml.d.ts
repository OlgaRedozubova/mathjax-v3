import { AbstractInputJax } from '../core/InputJax.js';
import { OptionList } from '../util/Options.js';
import { FunctionList } from '../util/FunctionList.js';
import { MathItem } from '../core/MathItem.js';
import { DOMAdaptor } from '../core/DOMAdaptor.js';
import { FindMathML } from './mathml/FindMathML.js';
import { MathMLCompile } from './mathml/MathMLCompile.js';
export declare class MathML<N, T, D> extends AbstractInputJax<N, T, D> {
    static NAME: string;
    static OPTIONS: OptionList;
    protected findMathML: FindMathML<N, T, D>;
    protected mathml: MathMLCompile<N, T, D>;
    protected mmlFilters: FunctionList;
    constructor(options?: OptionList);
    setAdaptor(adaptor: DOMAdaptor<N, T, D>): void;
    readonly processStrings: boolean;
    compile(math: MathItem<N, T, D>): any;
    protected checkForErrors(doc: D): D;
    protected error(message: string): void;
    findMath(node: N): import("../core/MathItem.js").ProtoItem<N, T>[];
}
