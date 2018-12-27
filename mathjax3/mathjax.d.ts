import { HandlerList } from './core/HandlerList.js';
import { handleRetriesFor, retryAfter } from './util/Retries.js';
import { OptionList } from './util/Options.js';
export declare const MathJax: {
    version: string;
    handlers: HandlerList<{}, {}, {}>;
    document: (document: any, options: OptionList) => any;
    handleRetriesFor: typeof handleRetriesFor;
    retryAfter: typeof retryAfter;
};
