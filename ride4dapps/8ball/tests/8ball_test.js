//
// Acryl dApp Magic 8 ball tests
//

describe('8 ball', () => {
    const ballAddress = "3JGVZkdiFoYdSDtcNESA1SvPiakQ6KdFAyP"
    const question = "Test" + Date.now()
    const tx = invokeScript({fee: 500000, dApp: ballAddress, call:{function:"tellme", args:[{"type": "string", "value": question}]}, payment: null})

    it('Tx is mined in block', async function(){
        await broadcast(tx)
        await waitForTx(tx.id)
    })

    it('Question is in ball', async function(){
        await accountDataByKey(address()+"_q", ballAddress)
            .then(reslove => expect(reslove.value).to.equal(question))
    })
})