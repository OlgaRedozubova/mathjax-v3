import { PropertyList } from '../../Tree/Node.js';
import { AbstractMmlLayoutNode, AttributeList } from '../MmlNode.js';
export declare class MmlMstyle extends AbstractMmlLayoutNode {
    static defaults: PropertyList;
    readonly kind: string;
    protected setChildInheritedAttributes(attributes: AttributeList, display: boolean, level: number, prime: boolean): void;
}
