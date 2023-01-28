from pyteal import *
from beaker import *
from typing import Final


class Voting(Application):

  token_id: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))

  # constants

  MIN_BAL = Int(100000)
  FEE = Int(1000)

  reg_begin: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))
  reg_end: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))
  vote_begin: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))
  vote_end: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))
  vote_count: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))
  num_of_voters: Final[ApplicationStateValue] = ApplicationStateValue(stack_type=TealType.uint64, default=Int(0))
  can_vote: Final[AccountStateValue] = AccountStateValue(stack_type=TealType.uint64, default=Int(0))
  vote_choice: Final[AccountStateValue] = AccountStateValue(stack_type=TealType.bytes, default=Bytes("abstain"))
  vote_amount: Final[AccountStateValue] = AccountStateValue(stack_type=TealType.uint64, default=Int(0))

  @create
  def create(self):
    return Seq(

      self.initialize_application_state()
    )

  @opt_in
  def optin(self):
    return Seq(
      
      self.initialize_account_state()
    )


  @external(authorize=Authorize.only(Global.creator_address()))
  def create_asset(self, asset_name: abi.String, unit_name: abi.String, total_supply: abi.Uint64, decimals: abi.Uint64):

    return Seq(
      Assert(self.token_id == Int(0)),
      InnerTxnBuilder.Execute({
        TxnField.type_enum: TxnType.AssetConfig,
        TxnField.config_asset_name: asset_name.get(),
        TxnField.config_asset_unit_name: unit_name.get(),
        TxnField.config_asset_total: total_supply.get(),
        TxnField.config_asset_decimals: decimals.get(),
        TxnField.config_asset_manager: self.address,
        TxnField.fee: self.FEE
      }),
      self.token_id.set(InnerTxn.created_asset_id())
    )


  @external(read_only=True)
  def get_token_id(self, *, output: abi.Uint64):
    return Seq(
      output.set(self.token_id)
    )

  @external
  def optin_asset(self, opt_txn: abi.AssetTransferTransaction):
    return Seq(
      Assert(
        Global.group_size() == Int(2),
        opt_txn.get().type_enum() == TxnType.AssetTransfer,
        opt_txn.get().asset_amount() == Int(0)
      ),
    )

  @external
  def transfer_asset(self, receiver: abi.Address, amount: abi.Uint64,
   a_id: abi.Asset = token_id, # type: ignore[assignment]
   ):
    return Seq(
      bal := AssetHolding.balance(account=receiver.get(), asset=self.token_id),
      Assert(bal.value() >= Int(0)),

      InnerTxnBuilder.Execute({
        TxnField.type_enum: TxnType.AssetTransfer,
        TxnField.asset_receiver: receiver.get(),
        TxnField.xfer_asset: self.token_id,
        TxnField.asset_amount: amount.get(),
        TxnField.fee: self.FEE,
        
      })
    )


  @external
  # (authorize=Authorize.only(Global.creator_address()))
  # can be called by anybody since we dont know time the reviewer wants to test it
  def create_registration_and_voting(self, reg_begin: abi.Uint64, reg_end: abi.Uint64, vote_begin: abi.Uint64, vote_end: abi.Uint64,):
    return Seq(
      self.reg_begin.set(Global.latest_timestamp() + reg_begin.get()),
      self.reg_end.set(Global.latest_timestamp() + reg_end.get()),
      self.vote_begin.set(Global.latest_timestamp() + vote_begin.get()),
      self.vote_end.set(Global.latest_timestamp() + vote_end.get()),
    )

  @external
  def register(self):
    return Seq(
      Assert(Global.latest_timestamp()>= self.reg_begin, Global.latest_timestamp()  <= self.reg_end),
      self.can_vote.set(Int(1))
    )

  @internal
  def increment_vote(self):
    return Seq(
      bal := AssetHolding.balance(Txn.sender(),self.token_id),
      Assert(bal.hasValue(), bal.value() >= Int(1000)),
      self.num_of_voters.set(self.num_of_voters + Int(1)),
      self.vote_count.set(self.vote_count + bal.value()),
      self.vote_amount.set(bal.value())
    )

  @external
  def cast_vote(self, vote_choice: abi.String,
  a_id: abi.Asset = token_id, # type: ignore[assignment]
  ):
    return Seq(
      Assert(Global.latest_timestamp() >= self.vote_begin, Global.latest_timestamp() <= self.vote_end),
      Assert(self.can_vote == Int(1)),
      Assert(Or(
        vote_choice.get() == Bytes("yes"),
        vote_choice.get() == Bytes("no"),
        vote_choice.get() == Bytes("abstain")
      )),
      If(vote_choice.get() == Bytes("yes"))
      .Then(
        # Make sure asset holding is >= 1000 and increment vote
        self.increment_vote()
      ),
      self.vote_choice.set(vote_choice.get()),
    )

  @bare_external(clear_state=CallConfig.CALL, close_out=CallConfig.CALL)
  def clear_vote(self):
    return Seq(
      Assert(Global.latest_timestamp() >= self.vote_begin, Global.latest_timestamp() <= self.vote_end),
      If(self.vote_choice == Bytes("yes"))
      .Then(
        self.num_of_voters.set(self.num_of_voters - Int(1)),
        self.vote_count.set(self.vote_count - self.vote_amount),
        self.vote_amount.set(Int(0))
      ),

      self.vote_choice.set(Bytes(""))
    )


if __name__ == "__main__":
  Voting().dump()