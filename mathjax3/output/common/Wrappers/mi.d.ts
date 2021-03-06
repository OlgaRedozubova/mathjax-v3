import { AnyWrapper, WrapperConstructor, Constructor } from '../Wrapper.js';
export interface CommonMi extends AnyWrapper {
    noIC: boolean;
}
export declare type MiConstructor = Constructor<CommonMi>;
export declare function CommonMiMixin<T extends WrapperConstructor>(Base: T): MiConstructor & T;
