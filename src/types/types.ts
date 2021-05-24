import type {OverrideBundleDefinition,RegistryTypes} from "@polkadot/types/types";

export const types1 : RegistryTypes = {
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
  }

  export const typeBundleForPolkadot: OverrideBundleDefinition = {
    types: [
      {
        minmax: [0, 1],
        types: types1,
      }
    ],
  };