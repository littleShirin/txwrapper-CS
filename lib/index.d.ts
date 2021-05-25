import { methods as substrateMethods } from '@substrate/txwrapper-substrate';
import { GetRegistryOptsCore, TypeRegistry } from "@substrate/txwrapper-core";
export declare const methods: {
    balances: typeof substrateMethods.balances;
    utility: typeof substrateMethods.utility;
    proxy: typeof substrateMethods.proxy;
};
export * from '@substrate/txwrapper-core';
/**
 * `ChainProperties` for networks that txwrapper-cs supports. These are normally returned
 * by `system_properties` call, but since they don't change much, it's pretty safe to hardcode them.
 */
declare const KNOWN_CHAIN_PROPERTIES: {
    developent: {
        ss58Format: number;
        tokenDecimals: number;
        tokenSymbol: string;
    };
};
/**
 * Options for the `getRegistry` function.
 */
export interface GetRegistryOpts extends GetRegistryOptsCore {
    specName: keyof typeof KNOWN_CHAIN_PROPERTIES;
}
/**
* Get a type registry for networks that txwrapper-cs supports.
*
* @param GetRegistryOptions specName, chainName, specVersion, and metadataRpc of the current runtime
*/
export declare function getRegistry({ specName, chainName, specVersion, metadataRpc, properties, }: GetRegistryOpts): TypeRegistry;
