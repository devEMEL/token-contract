import time
from asset import Asset
from beaker.client import ApplicationClient
from beaker import sandbox
from beaker.client.api_providers import Network, AlgoNode
from algosdk.atomic_transaction_composer import TransactionWithSigner
from algosdk.future.transaction import AssetTransferTxn, ApplicationOptInTxn


# client = AlgoNode(Network.TestNet).algod()
client = sandbox.get_algod_client()

accts = sandbox.get_accounts()

creator_acct = accts.pop()
acct1 = accts.pop()
acct2 = accts.pop()

app=Asset()

app_client = ApplicationClient(client=client, app=app, signer=creator_acct.signer)

def test():
	sp = client.suggested_params()
	app_id, app_addr, tx_id = app_client.create()
	print(f"App created with ID: {app_id}, and address: {app_addr} and signed with tx id: {tx_id}")

	app_client.fund(amt=1_000_000, addr=app_addr)
	app_client.fund(amt=1_000_000, addr=acct1.address)
	app_client.fund(amt=1_000_000, addr=acct2.address)

	app_client.call(app.create_token, asset_name="Algo Smart Coin", unit_name="ASC", total_supply=10_000_000_000, decimals=0)

	aid = app_client.call(app.get_asset_id).return_value
	print(aid)

	txn = TransactionWithSigner(txn=AssetTransferTxn(sender=creator_acct.address, sp=sp, receiver=creator_acct.address, amt=0, index=aid), signer=creator_acct.signer)
	app_client.call(app.optin_asset, txn=txn)
	app_client.call(app.transfer_to_creator, amount=1_000),

	acct1_client = app_client.prepare(signer=acct1.signer)

	txn = TransactionWithSigner(txn=AssetTransferTxn(sender=acct1.address, sp=sp, receiver=acct1.address, amt=0, index=aid), signer=acct1.signer)
	acct1_client.call(app.optin_asset, txn=txn)

	acct1_client.opt_in()
	print(acct1_client.get_account_state())

	acct1_client.call(app.get_asset_from_faucet, receiver=acct1.address, time=60)
	print(acct1_client.get_account_state())

	time.sleep(62)

	acct1_client.call(app.get_asset_from_faucet, receiver=acct1.address, time=120)
	print(acct1_client.get_account_state())	

	print(acct1_client.call(app.get_asset_bal, account=acct1.address).return_value)



test()
