declare global {
    interface Window {
        Document: typeof Document;
        DOMParser: typeof DOMParser;
        HTMLElement: typeof HTMLElement;
        HTMLCollection: typeof HTMLCollection;
        NodeList: typeof NodeList;
        DocumentFragment: typeof DocumentFragment;
    }
}
export declare function browserAdaptor(): any;
