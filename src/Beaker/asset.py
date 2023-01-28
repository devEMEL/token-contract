from typing import Final
from pyteal import *
from beaker import Application, Authorize, ApplicationStateValue, AccountStateValue, external, create, opt_in


class Asset(Application):
	asset_id: Final[ApplicationStateValue] = ApplicationStateValue(
		stack_type=TealType.uint64,
		default=Int(0)
	)
	claim_time: Final[AccountStateValue] = AccountStateValue(
		stack_type=TealType.uint64,
		default=Int(0)
	)

	FEE = Int(1_000)

	@create
	def create(self):
		return self.initialize_application_state()

	@opt_in
	def opt_in(self):
		return self.initialize_account_state()

	@external(authorize=Authorize.only(Global.creator_address()))
	def create_token(self, asset_name: abi.String, unit_name: abi.String, total_supply: abi.Uint64, decimals: abi.Uint64):
		return Seq(
			Assert(self.asset_id == Int(0)),
			InnerTxnBuilder.Execute({		
				TxnField.type_enum: TxnType.AssetConfig,
				TxnField.config_asset_name: asset_name.get(),
				TxnField.config_asset_unit_name: unit_name.get(),
				TxnField.config_asset_total: total_supply.get(),
				TxnField.config_asset_decimals: decimals.get(),
				TxnField.config_asset_manager: self.address,
				TxnField.fee: self.FEE
			}),
			self.asset_id.set(InnerTxn.created_asset_id())
		)

	@external(authorize=Authorize.only(Global.creator_address()))
	def transfer_to_creator(self,
		amount: abi.Uint64,
		aid: abi.Asset=asset_id # type: ignore[assignment]
	):
		return Seq(
			InnerTxnBuilder.Execute({
				TxnField.type_enum: TxnType.AssetTransfer,
				TxnField.xfer_asset: self.asset_id,
				TxnField.asset_receiver: Global.creator_address(),
				TxnField.asset_amount: amount.get(),
				TxnField.fee: self.FEE
			})
		)

	@external
	def optin_asset(
		self,
		txn: abi.AssetTransferTransaction,
		aid: abi.Asset=asset_id # type: ignore[assignment]
	):
		return Seq(
			Assert(
				txn.get().sender() == Txn.sender(),
				txn.get().asset_amount() == Int(0),
				txn.get().asset_receiver() == Txn.sender(),
				txn.get().xfer_asset() == self.asset_id
			)
		)

	@external
	def get_asset_id(
		self,
		aid: abi.Asset=asset_id, # type: ignore[assignment]
		*,
		output: abi.Uint64
	):
		return Seq(
			output.set(self.asset_id)
		)

	@external
	def get_asset_bal(
		self,
		account: abi.Account,
		asset_id: abi.Asset = asset_id,  # type: ignore[assignment]
		*,
		output: abi.Uint64
	):
		return Seq(
			(
				bal := AssetHolding.balance(
					account=account.address(), asset=self.asset_id
				)
			),
			output.set(bal.value())
		)

	@external
	def get_asset_from_faucet(
		self,
		receiver: abi.Account,
		time: abi.Uint64,
		aid: abi.Asset=asset_id # type: ignore[assignment]
	):
		return Seq(
			Assert(App.optedIn(Txn.sender(), Global.current_application_id())),
			Assert(Global.latest_timestamp() > self.claim_time),
			InnerTxnBuilder.Execute({
				TxnField.type_enum: TxnType.AssetTransfer,
				TxnField.xfer_asset: self.asset_id,
				TxnField.asset_receiver: receiver.address(),
				TxnField.asset_amount: Int(20),
				TxnField.fee: self.FEE			
			}),
			self.claim_time.set(Global.latest_timestamp() + time.get())
		)


Asset().dump()