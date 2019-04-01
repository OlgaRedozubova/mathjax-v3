export declare type PackageMap = Map<string, Package>;
export declare class PackageError extends Error {
    package: string;
    constructor(message: string, name: string);
}
export declare type PackageReady = (name: string) => string;
export declare type PackageFailed = (message: PackageError) => void;
export declare type PackagePromise = (resolve: PackageReady, reject: PackageFailed) => void;
export interface PackageConfig {
    ready?: PackageReady;
    failed?: PackageFailed;
    checkReady?: () => Promise<void>;
}
export declare class Package {
    static packages: PackageMap;
    name: string;
    isLoaded: boolean;
    promise: Promise<string>;
    protected isLoading: boolean;
    protected hasFailed: boolean;
    protected noLoad: boolean;
    protected resolve: PackageReady;
    protected reject: PackageFailed;
    protected dependents: Package[];
    protected dependencies: Package[];
    protected dependencyCount: number;
    readonly canLoad: boolean;
    constructor(name: string, noLoad?: boolean, preloaded?: boolean);
    protected makeDependencies(): Promise<string>[];
    protected makePromise(promises: Promise<string>[]): Promise<string>;
    load(): void;
    protected loadCustom(url: string): void;
    protected loadScript(url: string): void;
    loaded(): void;
    protected failed(message: string): void;
    protected checkLoad(): void;
    requirementSatisfied(): void;
    protected resolvePath(): string;
    addDependent(extension: Package, noLoad: boolean): void;
    checkNoLoad(): void;
    static loadAll(): void;
}
