/*import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {
    createV1,
    mplCore,
    fetchAssetV1,
    transferV1,
    createCollectionV1,
    getAssetV1GpaBuilder,
    Key,
    updateAuthority,
    pluginAuthorityPair,
    ruleSet
} from '@metaplex-foundation/mpl-core'
import { TransactionBuilderSendAndConfirmOptions, generateSigner, signerIdentity, sol } from '@metaplex-foundation/umi';

const umi = createUmi('http://127.0.0.1:8899', 'processed').use(mplCore())

const asset = generateSigner(umi);
const payer = generateSigner(umi);

umi.use(signerIdentity(payer));

const txConfig: TransactionBuilderSendAndConfirmOptions = {
    send: { skipPreflight: true },
    confirm: { commitment: 'processed' },
};

export const createNftCollection = async () => {

} {
    // 2. Create a collection asset
    const collectionAddress = generateSigner(umi);
    console.log('2. Creating Collection:', collectionAddress.publicKey.toString());
    const collectionUpdateAuthority = generateSigner(umi);
    const creator1 = generateSigner(umi);
    const creator2 = generateSigner(umi);
    await createCollectionV1(umi, {
        name: 'Quick Collection',                           // 👈 Replace this
        uri: 'https://your.domain.com/collection.json',     // 👈 Replace this
        collection: collectionAddress,
        updateAuthority: collectionUpdateAuthority.publicKey,
        plugins: [
            pluginAuthorityPair({
                type: 'Royalties',
                data: {
                    basisPoints: 500,
                    creators: [
                        {
                            address: creator1.publicKey,
                            percentage: 20,
                        },
                        {
                            address: creator2.publicKey,
                            percentage: 80,
                        },
                    ],
                    ruleSet: ruleSet('None'), // Compatibility rule set
                },
            }),
        ],
    }).sendAndConfirm(umi, txConfig);


    // 3. Create an asset in a collection
    await createV1(umi, {
        name: 'Quick Asset #1',                         // 👈 Replace this
        uri: 'https://your.domain.com/asset-id.json',   // 👈 Replace this
        asset: asset,
        collection: collectionAddress.publicKey,
        authority: collectionUpdateAuthority,
    }).sendAndConfirm(umi, txConfig);

    // 4. Fetch assets by owner
    const assetsByOwner = await getAssetV1GpaBuilder(umi)
        .whereField('key', Key.AssetV1)
        .whereField('owner', payer.publicKey)
        .getDeserialized();

    console.log(assetsByOwner);

    // 5. Fetch assets by collection
    const assetsByCollection = await getAssetV1GpaBuilder(umi)
        .whereField('key', Key.AssetV1)
        .whereField(
            'updateAuthority',
            updateAuthority('Collection', [collectionAddress.publicKey])
        )
        .getDeserialized();

    console.log(assetsByCollection);


    // 6. Transfer an asset
    const recipient = generateSigner(umi);
    await transferV1(umi, {
        asset: asset.publicKey,
        newOwner: recipient.publicKey,
        collection: collectionAddress.publicKey,
    }).sendAndConfirm(umi, txConfig);
}*/