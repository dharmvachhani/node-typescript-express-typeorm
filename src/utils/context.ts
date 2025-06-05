import { AsyncLocalStorage } from 'node:async_hooks';

type RequestContext = {
    ip?: string | string[];
    url?: string;
    method?: string;
    reqId?: string | string[];
    userId?: string;
    requestorRole?: string;
};

const contextStorage = new AsyncLocalStorage<RequestContext>();

export const Context = {
    run: <T>(data: RequestContext, fn: () => T): T => {
        return contextStorage.run(data, fn);
    },
    get: (): RequestContext | undefined => {
        return contextStorage.getStore();
    },
    set: (key: keyof RequestContext, value: any): void => {
        const store = contextStorage.getStore();
        if (store) store[key] = value;
    }
};
