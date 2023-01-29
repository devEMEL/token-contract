// import "app.css";
import algosdk from "algosdk";

import { MyAlgoSession } from "./wallets/myalgo";
import { Asset } from "./asset_client";

const myAlgo = new MyAlgoSession();
const algodClient = new algosdk.Algodv2(
  "",
  "https://node.testnet.algoexplorerapi.io",
  ""
);
const indexerClient = new algosdk.Indexer(
  "",
  "https://algoindexer.testnet.algoexplorerapi.io",
  ""
);

async function signer(txns: algosdk.Transaction[]) {
  const sTxns = await myAlgo.signTxns(txns);
  return sTxns.map((s) => s.blob);
}

let APPID = 156293058;
let ASSETID = 156293328;

//truncate wallet address
const truncate = (
  text: string,
  startChars: number,
  endChars: number,
  maxLength: number
): void => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    document.getElementById("connect").innerHTML = `${start + end}`;
  } else {
    document.getElementById("connect").innerHTML = `${text}`;
  }
};

const buttonIds = [
  "connect",
  // "create_app",
  // "opt_in",
  // "create_asset",
  "optin_to_contract",
  "optin_asset",
  //"get_asset_id",
  //"get_asset_bal",
  // "transfer_to_creator",
  "get_asset_from_faucet",
];
const buttons: { [key: string]: HTMLButtonElement } = {};
const accountsMenu = document.getElementById("accounts") as HTMLSelectElement;

let amountInput = document.getElementById(
  "transfer_amount"
) as HTMLInputElement;

buttonIds.forEach((id) => {
  buttons[id] = document.getElementById(id) as HTMLButtonElement;
});

buttons.connect.onclick = async () => {
  await myAlgo.getAccounts();
  myAlgo.accounts.forEach((account) => {
    //call function to truncate address
    truncate(account.address, 4, 4, 11);
    accountsMenu.add(
      new Option(`${account.name} - ${account.address}`, account.address)
    );
    console.log(account);
  });
};

// buttons.create_app.onclick = async () => {
//   const AssetApp = new Asset({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//   });

//   const { appId, appAddress, txId } = await AssetApp.create();

//   document.getElementById(
//     "create_app_status"
//   ).innerHTML = `App created with id: ${appId} and address: ${appAddress} in txId: ${txId}`;
// };

// buttons.create_asset.onclick = async () => {
//   const AssetApp = new Asset({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID,
//   });

//   const result = await AssetApp.create_token({
//     asset_name: String("Algo Smart Coin"),
//     unit_name: String("ASC"),
//     total_supply: BigInt(20_000_000_000),
//     decimals: BigInt(0),
//   });
//   console.log(result);
// };

buttons.optin_to_contract.onclick = async () => {
  const AssetApp = new Asset({
    client: algodClient,
    signer,
    sender: accountsMenu.selectedOptions[0].value,
    appId: APPID,
  });

  const result = await AssetApp.optIn();
  console.log(result);
};

buttons.optin_asset.onclick = async () => {
  const AssetApp = new Asset({
    client: algodClient,
    signer,
    sender: accountsMenu.selectedOptions[0].value,
    appId: APPID,
  });

  const opt_txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    from: accountsMenu.selectedOptions[0].value,
    to: accountsMenu.selectedOptions[0].value,
    amount: 0,
    suggestedParams: await algodClient.getTransactionParams().do(),
    assetIndex: ASSETID,
  });
  const result = await AssetApp.optin_asset({ txn: opt_txn });
  console.log(result);
};

// buttons.transfer_to_creator.onclick = async () => {
//   const AssetApp = new Asset({
//     client: algodClient,
//     signer,
//     sender: accountsMenu.selectedOptions[0].value,
//     appId: APPID,
//   });

//   const result = await AssetApp.transfer_to_creator({
//     amount: BigInt(amountInput.valueAsNumber),
//   });
//   console.log(result);
// };

buttons.get_asset_from_faucet.onclick = async () => {
  const AssetApp = new Asset({
    client: algodClient,
    signer,
    sender: accountsMenu.selectedOptions[0].value,
    appId: APPID,
  });

  const result = await AssetApp.get_asset_from_faucet({
    receiver: accountsMenu.selectedOptions[0].value,
    time: BigInt(120),
  });
  // 2 minutes
  console.log(result);
  console.log(AssetApp.getAccountState());
};
