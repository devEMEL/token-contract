import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Asset extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { asset_id: { type: bkr.AVMType.uint64, key: "asset_id", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: { claim_time: { type: bkr.AVMType.uint64, key: "claim_time", desc: "", static: false } }, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMSA0IDEwMDAKYnl0ZWNibG9jayAweDYxNzM3MzY1NzQ1ZjY5NjQgMHg2MzZjNjE2OTZkNWY3NDY5NmQ2NSAweDE1MWY3Yzc1CnR4biBOdW1BcHBBcmdzCmludGNfMCAvLyAwCj09CmJueiBtYWluX2wxNAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGVmMTJjYTYxIC8vICJjcmVhdGVfdG9rZW4oc3RyaW5nLHN0cmluZyx1aW50NjQsdWludDY0KXZvaWQiCj09CmJueiBtYWluX2wxMwp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDJmM2QwOTZmIC8vICJ0cmFuc2Zlcl90b19jcmVhdG9yKHVpbnQ2NCxhc3NldCl2b2lkIgo9PQpibnogbWFpbl9sMTIKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhjMmFjM2JhNCAvLyAib3B0aW5fYXNzZXQoYXhmZXIsYXNzZXQpdm9pZCIKPT0KYm56IG1haW5fbDExCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NTNmYTBlYmUgLy8gImdldF9hc3NldF9pZChhc3NldCl1aW50NjQiCj09CmJueiBtYWluX2wxMAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGZkMmQ5NGI3IC8vICJnZXRfYXNzZXRfYmFsKGFjY291bnQsYXNzZXQpdWludDY0Igo9PQpibnogbWFpbl9sOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGQ1NTc4NjRhIC8vICJnZXRfYXNzZXRfZnJvbV9mYXVjZXQoYWNjb3VudCx1aW50NjQsYXNzZXQpdm9pZCIKPT0KYm56IG1haW5fbDgKZXJyCm1haW5fbDg6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAxNQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ0b2kKc3RvcmUgMTYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDE3CmxvYWQgMTUKbG9hZCAxNgpsb2FkIDE3CmNhbGxzdWIgZ2V0YXNzZXRmcm9tZmF1Y2V0XzkKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDk6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAxMAp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMTEKbG9hZCAxMApsb2FkIDExCmNhbGxzdWIgZ2V0YXNzZXRiYWxfOApzdG9yZSAxMgpieXRlY18yIC8vIDB4MTUxZjdjNzUKbG9hZCAxMgppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDEwOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKY2FsbHN1YiBnZXRhc3NldGlkXzcKc3RvcmUgOApieXRlY18yIC8vIDB4MTUxZjdjNzUKbG9hZCA4Cml0b2IKY29uY2F0CmxvZwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTE6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA3CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgNgpsb2FkIDYKZ3R4bnMgVHlwZUVudW0KaW50Y18yIC8vIGF4ZmVyCj09CmFzc2VydApsb2FkIDYKbG9hZCA3CmNhbGxzdWIgb3B0aW5hc3NldF82CmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpidG9pCnN0b3JlIDQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDUKbG9hZCA0CmxvYWQgNQpjYWxsc3ViIHRyYW5zZmVydG9jcmVhdG9yXzUKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDEzOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCnN0b3JlIDAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgpzdG9yZSAxCnR4bmEgQXBwbGljYXRpb25BcmdzIDMKYnRvaQpzdG9yZSAyCnR4bmEgQXBwbGljYXRpb25BcmdzIDQKYnRvaQpzdG9yZSAzCmxvYWQgMApsb2FkIDEKbG9hZCAyCmxvYWQgMwpjYWxsc3ViIGNyZWF0ZXRva2VuXzQKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE0Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2wxOAp0eG4gT25Db21wbGV0aW9uCmludGNfMSAvLyBPcHRJbgo9PQpibnogbWFpbl9sMTcKZXJyCm1haW5fbDE3Ogp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQphc3NlcnQKY2FsbHN1YiBvcHRpbl8xCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxODoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmNhbGxzdWIgY3JlYXRlXzAKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBjcmVhdGUKY3JlYXRlXzA6CmJ5dGVjXzAgLy8gImFzc2V0X2lkIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIG9wdF9pbgpvcHRpbl8xOgp0eG4gU2VuZGVyCmJ5dGVjXzEgLy8gImNsYWltX3RpbWUiCmludGNfMCAvLyAwCmFwcF9sb2NhbF9wdXQKcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMjoKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzM6Cmdsb2JhbCBDcmVhdG9yQWRkcmVzcwo9PQpyZXRzdWIKCi8vIGNyZWF0ZV90b2tlbgpjcmVhdGV0b2tlbl80OgpzdG9yZSAyMQpzdG9yZSAyMApzdG9yZSAxOQpzdG9yZSAxOAp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMgovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmJ5dGVjXzAgLy8gImFzc2V0X2lkIgphcHBfZ2xvYmFsX2dldAppbnRjXzAgLy8gMAo9PQphc3NlcnQKaXR4bl9iZWdpbgpwdXNoaW50IDMgLy8gYWNmZwppdHhuX2ZpZWxkIFR5cGVFbnVtCmxvYWQgMTgKZXh0cmFjdCAyIDAKaXR4bl9maWVsZCBDb25maWdBc3NldE5hbWUKbG9hZCAxOQpleHRyYWN0IDIgMAppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0VW5pdE5hbWUKbG9hZCAyMAppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0VG90YWwKbG9hZCAyMQppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0RGVjaW1hbHMKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKaXR4bl9maWVsZCBDb25maWdBc3NldE1hbmFnZXIKaW50Y18zIC8vIDEwMDAKaXR4bl9maWVsZCBGZWUKaXR4bl9zdWJtaXQKYnl0ZWNfMCAvLyAiYXNzZXRfaWQiCml0eG4gQ3JlYXRlZEFzc2V0SUQKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyB0cmFuc2Zlcl90b19jcmVhdG9yCnRyYW5zZmVydG9jcmVhdG9yXzU6CnN0b3JlIDIzCnN0b3JlIDIyCnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV8zCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKaXR4bl9iZWdpbgppbnRjXzIgLy8gYXhmZXIKaXR4bl9maWVsZCBUeXBlRW51bQpieXRlY18wIC8vICJhc3NldF9pZCIKYXBwX2dsb2JhbF9nZXQKaXR4bl9maWVsZCBYZmVyQXNzZXQKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCml0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgpsb2FkIDIyCml0eG5fZmllbGQgQXNzZXRBbW91bnQKaW50Y18zIC8vIDEwMDAKaXR4bl9maWVsZCBGZWUKaXR4bl9zdWJtaXQKcmV0c3ViCgovLyBvcHRpbl9hc3NldApvcHRpbmFzc2V0XzY6CnN0b3JlIDI1CnN0b3JlIDI0CmxvYWQgMjQKZ3R4bnMgU2VuZGVyCnR4biBTZW5kZXIKPT0KYXNzZXJ0CmxvYWQgMjQKZ3R4bnMgQXNzZXRBbW91bnQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmxvYWQgMjQKZ3R4bnMgQXNzZXRSZWNlaXZlcgp0eG4gU2VuZGVyCj09CmFzc2VydApsb2FkIDI0Cmd0eG5zIFhmZXJBc3NldApieXRlY18wIC8vICJhc3NldF9pZCIKYXBwX2dsb2JhbF9nZXQKPT0KYXNzZXJ0CnJldHN1YgoKLy8gZ2V0X2Fzc2V0X2lkCmdldGFzc2V0aWRfNzoKc3RvcmUgOQpieXRlY18wIC8vICJhc3NldF9pZCIKYXBwX2dsb2JhbF9nZXQKcmV0c3ViCgovLyBnZXRfYXNzZXRfYmFsCmdldGFzc2V0YmFsXzg6CnN0b3JlIDEzCnR4bmFzIEFjY291bnRzCmJ5dGVjXzAgLy8gImFzc2V0X2lkIgphcHBfZ2xvYmFsX2dldAphc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKc3RvcmUgMTQKcmV0c3ViCgovLyBnZXRfYXNzZXRfZnJvbV9mYXVjZXQKZ2V0YXNzZXRmcm9tZmF1Y2V0Xzk6CnN0b3JlIDI4CnN0b3JlIDI3CnN0b3JlIDI2CnR4biBTZW5kZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbklECmFwcF9vcHRlZF9pbgphc3NlcnQKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcAp0eG4gU2VuZGVyCmJ5dGVjXzEgLy8gImNsYWltX3RpbWUiCmFwcF9sb2NhbF9nZXQKPgphc3NlcnQKaXR4bl9iZWdpbgppbnRjXzIgLy8gYXhmZXIKaXR4bl9maWVsZCBUeXBlRW51bQpieXRlY18wIC8vICJhc3NldF9pZCIKYXBwX2dsb2JhbF9nZXQKaXR4bl9maWVsZCBYZmVyQXNzZXQKbG9hZCAyNgp0eG5hcyBBY2NvdW50cwppdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKcHVzaGludCAyMCAvLyAyMAppdHhuX2ZpZWxkIEFzc2V0QW1vdW50CmludGNfMyAvLyAxMDAwCml0eG5fZmllbGQgRmVlCml0eG5fc3VibWl0CnR4biBTZW5kZXIKYnl0ZWNfMSAvLyAiY2xhaW1fdGltZSIKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApsb2FkIDI3CisKYXBwX2xvY2FsX3B1dApyZXRzdWI=";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "create_token", desc: "", args: [{ type: "string", name: "asset_name", desc: "" }, { type: "string", name: "unit_name", desc: "" }, { type: "uint64", name: "total_supply", desc: "" }, { type: "uint64", name: "decimals", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "transfer_to_creator", desc: "", args: [{ type: "uint64", name: "amount", desc: "" }, { type: "asset", name: "aid", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "optin_asset", desc: "", args: [{ type: "axfer", name: "txn", desc: "" }, { type: "asset", name: "aid", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_asset_id", desc: "", args: [{ type: "asset", name: "aid", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_asset_bal", desc: "", args: [{ type: "account", name: "account", desc: "" }, { type: "asset", name: "asset_id", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_asset_from_faucet", desc: "", args: [{ type: "account", name: "receiver", desc: "" }, { type: "uint64", name: "time", desc: "" }, { type: "asset", name: "aid", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async create_token(args: {
        asset_name: string;
        unit_name: string;
        total_supply: bigint;
        decimals: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.create_token({ asset_name: args.asset_name, unit_name: args.unit_name, total_supply: args.total_supply, decimals: args.decimals }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async transfer_to_creator(args: {
        amount: bigint;
        aid?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.transfer_to_creator({ amount: args.amount, aid: args.aid === undefined ? await this._resolve("global-state", "asset_id") as bigint : args.aid }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async optin_asset(args: {
        txn: algosdk.TransactionWithSigner | algosdk.Transaction;
        aid?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.optin_asset({ txn: args.txn, aid: args.aid === undefined ? await this._resolve("global-state", "asset_id") as bigint : args.aid }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async get_asset_id(args: {
        aid?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.get_asset_id({ aid: args.aid === undefined ? await this._resolve("global-state", "asset_id") as bigint : args.aid }, txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async get_asset_bal(args: {
        account: string;
        asset_id?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.get_asset_bal({ account: args.account, asset_id: args.asset_id === undefined ? await this._resolve("global-state", "asset_id") as bigint : args.asset_id }, txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async get_asset_from_faucet(args: {
        receiver: string;
        time: bigint;
        aid?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.get_asset_from_faucet({ receiver: args.receiver, time: args.time, aid: args.aid === undefined ? await this._resolve("global-state", "asset_id") as bigint : args.aid }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        create_token: async (args: {
            asset_name: string;
            unit_name: string;
            total_supply: bigint;
            decimals: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "create_token"), { asset_name: args.asset_name, unit_name: args.unit_name, total_supply: args.total_supply, decimals: args.decimals }, txnParams, atc);
        },
        transfer_to_creator: async (args: {
            amount: bigint;
            aid?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "transfer_to_creator"), { amount: args.amount, aid: args.aid === undefined ? await this._resolve("global-state", "asset_id") : args.aid }, txnParams, atc);
        },
        optin_asset: async (args: {
            txn: algosdk.TransactionWithSigner | algosdk.Transaction;
            aid?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "optin_asset"), { txn: args.txn, aid: args.aid === undefined ? await this._resolve("global-state", "asset_id") : args.aid }, txnParams, atc);
        },
        get_asset_id: async (args: {
            aid?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_asset_id"), { aid: args.aid === undefined ? await this._resolve("global-state", "asset_id") : args.aid }, txnParams, atc);
        },
        get_asset_bal: async (args: {
            account: string;
            asset_id?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_asset_bal"), { account: args.account, asset_id: args.asset_id === undefined ? await this._resolve("global-state", "asset_id") : args.asset_id }, txnParams, atc);
        },
        get_asset_from_faucet: async (args: {
            receiver: string;
            time: bigint;
            aid?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_asset_from_faucet"), { receiver: args.receiver, time: args.time, aid: args.aid === undefined ? await this._resolve("global-state", "asset_id") : args.aid }, txnParams, atc);
        }
    };
}
