
// import algosdk from "algosdk";

// import { MyAlgoSession} from './wallets/myalgo'
// import { Voting } from './voting_client';


// // const atc = new algosdk.AtomicTransactionComposer()
// const myAlgo = new MyAlgoSession();
// const algodClient = new algosdk.Algodv2('', "https://node.testnet.algoexplorerapi.io", '');
// const indexerClient = new algosdk.Indexer('', "https://algoindexer.testnet.algoexplorerapi.io", '');

// async function signer(txns: algosdk.Transaction[]) {
//   const sTxns = await myAlgo.signTxns(txns)
//   return sTxns.map(s => s.blob)
// }

// let APPID = 155936954;
// let ASSETID = 155937703;


// (async() => {
//   let response = await indexerClient.lookupApplications(APPID).includeAll(true).do();
  
//   let globalState = response.application.params["global-state"];
//   let num_of_voters = globalState.find((state: { key: string; }) => {
//     return state.key === Buffer.from("num_of_voters", 'utf8').toString('base64')
//   })
//   let vote_count = globalState.find((state: { key: string; }) => {
//     return state.key === Buffer.from("vote_count", 'utf8').toString('base64')
//   })
//   console.log(num_of_voters.value.uint);
//   console.log(vote_count.value.uint);
//   document.getElementById("num_of_voters").innerHTML = `${num_of_voters.value.uint}`
//   document.getElementById("vote_count").innerHTML = `${vote_count.value.uint}`
  
// })();

// const buttonIds = ['connect', 'create_app','create_asset', 'create_registration_and_voting', 'optin_to_app', 'register', 'optin_to_asset', 'transfer_asset', 'cast_vote', 'clear_vote', 'asset_holding'];
// const buttons: {[key: string]: HTMLButtonElement} = {};
// const accountsMenu = document.getElementById('accounts') as HTMLSelectElement;

// let amountInput = document.getElementById("transfer_amount") as HTMLInputElement


// buttonIds.forEach(id => {
//   buttons[id] = document.getElementById(id) as HTMLButtonElement
// })

// buttons.connect.onclick = async () => {
//   await myAlgo.getAccounts()
//   myAlgo.accounts.forEach(account => {
//     accountsMenu.add(new Option(`${account.name} - ${account.address}`, account.address))
//     console.log(account);
    
//   })
  
// }

// buttons.create_app.onclick = async () => {
//   const votingApp = new Voting({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//   });

//   const { appId, appAddress, txId } = await votingApp.create();

//   document.getElementById('create_app_status').innerHTML = `App created with id: ${appId} and address: ${appAddress} in txId: ${txId}`;
  
// }

// buttons.create_asset.onclick = async () => {
//   const votingApp = new Voting({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

  
//   const result = await votingApp.create_asset({
//     asset_name: String("Energy Now On Sale"),
//     unit_name: String("ENS"),
//     total_supply: BigInt(100_000),
//     decimals: BigInt(0)

//   });
//   console.log(result);

  
// }

// buttons.create_registration_and_voting.onclick = async () => {
//   const votingApp = new Voting({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

//   const result = await votingApp.create_registration_and_voting({
//     reg_begin: BigInt(120),
//     reg_end: BigInt(1200),

//     vote_begin: BigInt(1800),
//     vote_end: BigInt(10800)

//   });
//   console.log(result)
// }

// buttons.optin_to_app.onclick = async () => {
//   const votingApp = new Voting({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

//   const result = await votingApp.optIn();
//   console.log(result)
// }

// buttons.register.onclick = async () => {
//   const votingApp = new Voting({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

//   const result = await votingApp.register();
//   console.log(result)
// }


// buttons.optin_to_asset.onclick = async () => {
//   const votingApp = new Voting({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

//   const opt_txn1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//     from: accountsMenu.selectedOptions[0].value,
//     to: accountsMenu.selectedOptions[0].value,
//     amount: 0,
//     suggestedParams: await algodClient.getTransactionParams().do(),
//     assetIndex: ASSETID,
//   })


//   const result = await votingApp.optin_asset({opt_txn: opt_txn1});
//   console.log(result)
// }



// buttons.transfer_asset.onclick = async () => {
//   const votingApp = new Voting({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

//   const result = await votingApp.transfer_asset({receiver: accountsMenu.selectedOptions[0].value, amount: BigInt(amountInput.valueAsNumber)});
//   console.log(result)
// }

// buttons.cast_vote.onclick = async () => {
//   const votingApp = new Voting({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

//   const result = await votingApp.cast_vote({vote_choice: String("yes")});
//   console.log(result)
// }

// buttons.clear_vote.onclick = async () => {
//   const votingApp = new Voting({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });

//   const result = await votingApp.closeOut();
//   console.log(result)
// }

// const getAssetHolding = async (addr: any, asset_id: any) => {
//   const accountInfo = await algodClient.accountInformation(addr).do();
//   const asset = accountInfo["assets"].find((asset: { [x: string]: number; } ) => {
//     return asset["asset-id"] === asset_id
//   });
//   return asset;
// }

// buttons.asset_holding.onclick = async () => {

//   const votingApp = new Voting({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID
//   });
//   const state = await votingApp.getAccountState(accountsMenu.selectedOptions[0].value);
//   // const state = await votingApp.getApplicationState();
//   console.log(state);


// }
