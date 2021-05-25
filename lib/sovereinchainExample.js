"use strict";
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @ignore Don't show this file in documentation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@polkadot/api");
const util_crypto_1 = require("@polkadot/util-crypto");
const src_1 = require("../src");
const util_1 = require("./util");
/**
 * Entry point of the script. This script assumes a SovereinChain node is running
 * locally on `http://localhost:9933`.
 */
async function main() {
    // Wait for the promise to resolve async WASM
    await util_crypto_1.cryptoWaitReady();
    // Create a new keyring, and add an "Alice" account
    const keyring = new api_1.Keyring();
    const alice = keyring.addFromUri('//Alice', { name: 'Alice' }, 'sr25519');
    console.log("Alice's SS58-Encoded Address:", src_1.deriveAddress(alice.publicKey, 42));
    // To construct the tx, we need some up-to-date information from the node.
    // `txwrapper` is offline-only, so does not care how you retrieve this info.
    // In this tutorial, we simply send RPC requests to the node.
    const { block } = await util_1.rpcToLocalNode('chain_getBlock');
    const blockHash = await util_1.rpcToLocalNode('chain_getBlockHash');
    const genesisHash = await util_1.rpcToLocalNode('chain_getBlockHash', [0]);
    const metadataRpc = await util_1.rpcToLocalNode('state_getMetadata');
    const { specVersion, transactionVersion, specName } = await util_1.rpcToLocalNode('state_getRuntimeVersion');
    console.log('block', blockHash);
    // Create SovereinChain type registry.
    const registry = src_1.getRegistry({
        chainName: 'developent',
        specName,
        specVersion,
        metadataRpc,
    });
    const dest = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
    // Now we can create our `balances.transfer` unsigned tx. The following
    // function takes the above data as arguments, so can be performed offline
    // if desired.
    const unsigned = src_1.methods.balances.transfer({
        value: '12',
        dest: dest,
    }, {
        address: src_1.deriveAddress(alice.publicKey, 42),
        blockHash,
        blockNumber: registry
            .createType('BlockNumber', block.header.number)
            .toNumber(),
        eraPeriod: 64,
        genesisHash,
        metadataRpc,
        nonce: 4,
        specVersion,
        tip: 0,
        transactionVersion,
    }, {
        metadataRpc,
        registry,
    });
    console.log('dest', dest);
    // Decode an unsigned transaction.
    const decodedUnsigned = src_1.decode(unsigned, {
        metadataRpc,
        registry,
    });
    console.log(
    // Decoding the transfer amount
    `\nDecoded Transaction\n  To: ${dest}\n` +
        `  Amount: ${decodedUnsigned.method.args.value}`);
    // Construct the signing payload from an unsigned transaction.
    const signingPayload = src_1.construct.signingPayload(unsigned, { registry });
    console.log(`\nPayload to Sign: ${signingPayload}`);
    // Decode the information from a signing payload.
    const payloadInfo = src_1.decode(signingPayload, {
        metadataRpc,
        registry,
    });
    console.log(
    // Decoded transaction of the transfer and providing the tx information
    `\nDecoded Transaction\n  To: ${dest}\n` +
        `  Amount: ${payloadInfo.method.args.value}`);
    // Sign a payload. This operation should be performed on an offline device.
    const signature = util_1.signWith(alice, signingPayload, {
        metadataRpc,
        registry,
    });
    console.log(`\nSignature: ${signature}`);
    // Encode a signed transaction.
    const tx = src_1.construct.signedTx(unsigned, signature, {
        metadataRpc,
        registry,
    });
    console.log(`\nTransaction to Submit: ${tx}`);
    // Calculate the tx hash of the signed transaction offline.
    const expectedTxHash = src_1.construct.txHash(tx);
    console.log(`\nExpected Tx Hash: ${expectedTxHash}`);
    // Send the tx to the node. Since `txwrapper` is offline-only, this
    // operation should be handled externally. Here, we just send a JSONRPC
    // request directly to the node.
    const actualTxHash = await util_1.rpcToLocalNode('author_submitExtrinsic', [tx]);
    console.log(`Actual Tx Hash: ${actualTxHash}`);
    // Decode a signed payload.
    const txInfo = src_1.decode(tx, {
        metadataRpc,
        registry,
    });
    console.log(
    // Decoded transaction of the transfer and providing the tx information
    `\nDecoded Transaction\n  To: ${dest}\n` +
        `  Amount: ${txInfo.method.args.value}\n`);
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=sovereinchainExample.js.map