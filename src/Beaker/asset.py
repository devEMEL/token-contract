from typing import Final
from pyteal import *
from beaker import Application, Authorize, ApplicationStateValue, AccountStateValue, external, create, opt_in

	# defines Asset ID of the token being managed by this contract
	# The type of the value stored in the global state
	# The default value of the global state
class Asset(Application):
	asset_id: Final[ApplicationStateValue] = ApplicationStateValue(
		stack_type=TealType.uint64,
		default=Int(0)
	)
	# The amount of tokens that have been claimed by the user
	# The type of the value stored in the account state
	# The default value of the account state
	claim_time: Final[AccountStateValue] = AccountStateValue(
		stack_type=TealType.uint64,
		default=Int(0)
	)
	# The fee charged for interacting with this contract
	FEE = Int(1_000)

	# The create method is called when the contract calls the create method on the application
	@create
	def create(self):
		return self.initialize_application_state()

	# The opt_in method is called when the user is opted in to the contract
	@opt_in
	def opt_in(self):
		return self.initialize_account_state()

	# The external decorator is used to expose the authorize method to be only allowed by the creator address on the global state
	@external(authorize=Authorize.only(Global.creator_address()))
	# The create_token method is used to instantiate the token
	def create_token(self, asset_name: abi.String, unit_name: abi.String, total_supply: abi.Uint64, decimals: abi.Uint64):
		# The Seq method is used to execute multiple operations in a single transaction group
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
	# The external decorator is used to expose the authorize method to be only allowed by the creator address on the global state
	@external(authorize=Authorize.only(Global.creator_address()))
	def transfer_to_creator(self,
		amount: abi.Uint64,
		aid: abi.Asset=asset_id # type: ignore[assignment]
	):
		return Seq(
			# InnerTxnBuilder.Execute is used to create a transaction group with the current sequence and the inner transaction fields that is being created by the builder method Execute 
			InnerTxnBuilder.Execute({
				TxnField.type_enum: TxnType.AssetTransfer,
				TxnField.xfer_asset: self.asset_id,
				TxnField.asset_receiver: Global.creator_address(),
				TxnField.asset_amount: amount.get(),
				TxnField.fee: self.FEE
			})
		)

	# The external decorator is used to expose the optin_asset method to be only allowed by the creator address 
	@external
	def optin_asset(
		self,
		txn: abi.AssetTransferTransaction,
		aid: abi.Asset=asset_id # type: ignore[assignment]
	):
		return Seq(
			# The Assert method is used to check if the transaction is valid
			Assert(
				# The Txn.sender() method is used to get the sender address of the current transaction
				txn.get().sender() == Txn.sender(),
				# The Txn.asset_amount() method is used to get the amount of asset being transferred
				txn.get().asset_amount() == Int(0),
				# The Txn.asset_receiver() method is used to get the receiver address of the current transaction
				txn.get().asset_receiver() == Txn.sender(),
				# The Txn.xfer_asset() method is used to get the asset ID of the asset being transferred
				txn.get().xfer_asset() == self.asset_id
			)
		)

	# The external decorator is used to expose the get_asset_id method to be only allowed by the creator address
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

	# The external decorator is used to expose the get_asset_bal method to be only allowed by the creator address
	@external
	def get_asset_bal(
		self,
		# The account is used to get the account address of the user
		account: abi.Account,
		# The asset_id is used to get the asset ID of the asset being transferred
		asset_id: abi.Asset = asset_id,  # type: ignore[assignment]
		*,
		# The output is used to get the output of the transaction in the form of a Uint64 value 
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
	# The external decorator is used to expose the get_asset_from_faucet method
	# Assert is used to check if the user is opted in to the application by checking the global state of the application id
	@external
	def get_asset_from_faucet(
		self,
		receiver: abi.Account,
		time: abi.Uint64,
		aid: abi.Asset=asset_id # type: ignore[assignment]
	):
		return Seq(		
			# Assert is used to check if the user is opted in to the application by checking the global state of the application id
			Assert(App.optedIn(Txn.sender(), Global.current_application_id())),
			# assert is used to check ifthe latest timestamp is greater than the claim time
			Assert(Global.latest_timestamp() > self.claim_time),
			# InnerTxnBuilder.Execute is used to create a transaction group with the current sequence and the inner transaction fields that is being created by the builder method Execute
			InnerTxnBuilder.Execute({
				# The TxnField.type_enum is used to specify the type of transaction that is being created
				TxnField.type_enum: TxnType.AssetTransfer,
				# The TxnField.xfer_asset is used to specify the asset id that is being transferred
				TxnField.xfer_asset: self.asset_id,
				# The TxnField.asset_receiver is used to specify the receiver of the asset
				TxnField.asset_receiver: receiver.address(),
				# The TxnField.asset_amount is used to specify the amount of asset that is being transferred
				TxnField.asset_amount: Int(20),
				# The TxnField.fee is used to specify the fee of the transaction
				TxnField.fee: self.FEE			
			}),
			# The self.claim_time is used to set the time when the user can claim the asset again
			self.claim_time.set(Global.latest_timestamp() + time.get())
		)

# The compileTeal method is used to compile the smart contract code to TEAL
Asset().dump()
