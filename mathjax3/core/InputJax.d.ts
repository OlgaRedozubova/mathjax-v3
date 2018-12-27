import { MathItem, ProtoItem } from './MathItem.js';
import { MmlNode } from './MmlTree/MmlNode.js';
import { OptionList } from '../util/Options.js';
import { FunctionList } from '../util/FunctionList.js';
import { DOMAdaptor } from '../core/DOMAdaptor.js';
export interface InputJax<N, T, D> {
    name: string;
    processStrings: boolean;
    options: OptionList;
    preFilters: FunctionList;
    postFilters: FunctionList;
    adaptor: DOMAdaptor<N, T, D>;
    setAdaptor(adaptor: DOMAdaptor<N, T, D>): void;
    findMath(which: N | string[], options?: OptionList): ProtoItem<N, T>[];
    compile(math: MathItem<N, T, D>): MmlNode;
}
export declare abstract class AbstractInputJax<N, T, D> implements InputJax<N, T, D> {
    static NAME: string;
    static OPTIONS: OptionList;
    options: OptionList;
    preFilters: FunctionList;
    postFilters: FunctionList;
    adaptor: DOMAdaptor<N, T, D>;
    constructor(options?: OptionList);
    readonly name: string;
    setAdaptor(adaptor: DOMAdaptor<N, T, D>): void;
    readonly processStrings: boolean;
    findMath(node: N | string[], options?: OptionList): ProtoItem<N, T>[];
    abstract compile(math: MathItem<N, T, D>): MmlNode;
    protected executeFilters(filters: FunctionList, math: MathItem<N, T, D>, data: any): any;
}
