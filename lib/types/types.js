"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeBundleForPolkadot = exports.types1 = void 0;
exports.types1 = {
    "Address": "MultiAddress",
    "LookupSource": "MultiAddress",
    "ClassId": "u32",
    "ClassInfoOf": "ClassId",
    "BalanceOf": "Balance",
    "SovereignAsset": {
        "success_url": "Vec<u8>",
        "failure_url": "Vec<u8>",
        "paid": "bool",
        "sent": "bool"
    },
    "SovereignAssetIndex": "u128",
    "SovereignAssetIndexOf": "SovereignAssetIndex",
    "TokenId": "u128",
    "TokenInfo": {
        "metadata": "Vec<u8>",
        "owner": "AccountId",
        "data": "SovereignAsset"
    },
    "TokenInfoOf": "TokenInfo",
    "DigitalAsset": {
        "account_id": "AccountId",
        "success_url": "Vec<u8>",
        "failure_url": "Vec<u8>",
        "paid": "bool",
        "id": "[u8;16]"
    }
};
exports.typeBundleForPolkadot = {
    types: [
        {
            minmax: [0, 1],
            types: exports.types1,
        }
    ],
};
//# sourceMappingURL=types.js.map