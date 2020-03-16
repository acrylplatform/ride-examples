//
// Momentary Lottery tests
// Tests will run from current IDE account
// Account should have at lease 5 Acryl and at least 0.01 non Acryl tokens
//

describe('Momentary Lotto', () => {
    const lottoAddress = "3JGVZkdiFoYdSDtcNESA1SvPiakQ6KdFAyP"
    const someAssetId = "6WyiSedm8P3XZnmrjyxEY8s4kTHMZyANb7pPS4Y4v8iZ" //Should be on test account balance
    const betAmount = 1000000

    it('Play with function name', async function(){
        const tx = invokeScript({ fee: 500000, dApp: lottoAddress, call: {function: "lotto", args: []}, payment: [{assetId: null, amount: betAmount}]})
        await broadcast(tx)
        await waitForTx(tx.id)
    })

    it('Play with default function', async function(){
        const tx = invokeScript({ fee: 500000, dApp: lottoAddress, call: null, payment: [{assetId: null, amount: betAmount}]})
        await broadcast(tx)
        await waitForTx(tx.id)
    })

    it('Without payment', async function(){
        const tx = invokeScript({ fee: 500000, dApp: lottoAddress, call: null, payment: []})
        return expect(broadcast(tx)).to.eventually
            .be.rejectedWith("Should be with Payment in Acryl")
    })

    it('With payment not in Acryl', async function(){
        const tx = invokeScript({ fee: 500000, dApp: lottoAddress, call: null, payment: [{assetId: someAssetId, amount: betAmount}]})
        return expect(broadcast(tx)).to.eventually
            .be.rejectedWith("Payment should be in Acryl")
    })

    it('Bet amount is too large', async function(){
        const lottoBalance = await balance(lottoAddress)
        const bet = Math.trunc(lottoBalance / 10)
        const tx = invokeScript({ fee: 500000, dApp: lottoAddress, call: null, payment: [{assetId: null, amount: bet}]})
        return expect(broadcast(tx)).to.eventually
            .be.rejectedWith("Payment should be less than")
    })
})