import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Asset extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { asset_id: { type: bkr.AVMType.uint64, key: "asset_id", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: { claim_time: { type: bkr.AVMType.uint64, key: "claim_time", desc: "", static: false }, has_opted_in: { type: bkr.AVMType.uint64, key: "has_opted_in", desc: "", static: false } }, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMSA0IDEwMDAKYnl0ZWNibG9jayAweDYxNzM3MzY1NzQ1ZjY5NjQgMHg2ODYxNzM1ZjZmNzA3NDY1NjQ1ZjY5NmUgMHg2MzZjNjE2OTZkNWY3NDY5NmQ2NQp0eG4gTnVtQXBwQXJncwppbnRjXzAgLy8gMAo9PQpibnogbWFpbl9sMTIKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhlZjEyY2E2MSAvLyAiY3JlYXRlX3Rva2VuKHN0cmluZyxzdHJpbmcsdWludDY0LHVpbnQ2NCl2b2lkIgo9PQpibnogbWFpbl9sMTEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgyZjNkMDk2ZiAvLyAidHJhbnNmZXJfdG9fY3JlYXRvcih1aW50NjQsYXNzZXQpdm9pZCIKPT0KYm56IG1haW5fbDEwCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4YzJhYzNiYTQgLy8gIm9wdGluX2Fzc2V0KGF4ZmVyLGFzc2V0KXZvaWQiCj09CmJueiBtYWluX2w5CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NTNmYTBlYmUgLy8gImdldF9hc3NldF9pZChhc3NldCl1aW50NjQiCj09CmJueiBtYWluX2w4CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZDU1Nzg2NGEgLy8gImdldF9hc3NldF9mcm9tX2ZhdWNldChhY2NvdW50LHVpbnQ2NCxhc3NldCl2b2lkIgo9PQpibnogbWFpbl9sNwplcnIKbWFpbl9sNzoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDEwCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKYnRvaQpzdG9yZSAxMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAzCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMTIKbG9hZCAxMApsb2FkIDExCmxvYWQgMTIKY2FsbHN1YiBnZXRhc3NldGZyb21mYXVjZXRfOAppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sODoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCmNhbGxzdWIgZ2V0YXNzZXRpZF83CnN0b3JlIDgKcHVzaGJ5dGVzIDB4MTUxZjdjNzUgLy8gMHgxNTFmN2M3NQpsb2FkIDgKaXRvYgpjb25jYXQKbG9nCmludGNfMSAvLyAxCnJldHVybgptYWluX2w5Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgNwp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCnN0b3JlIDYKbG9hZCA2Cmd0eG5zIFR5cGVFbnVtCmludGNfMiAvLyBheGZlcgo9PQphc3NlcnQKbG9hZCA2CmxvYWQgNwpjYWxsc3ViIG9wdGluYXNzZXRfNgppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTA6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYnRvaQpzdG9yZSA0CnR4bmEgQXBwbGljYXRpb25BcmdzIDIKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSA1CmxvYWQgNApsb2FkIDUKY2FsbHN1YiB0cmFuc2ZlcnRvY3JlYXRvcl81CmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMToKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpzdG9yZSAwCnR4bmEgQXBwbGljYXRpb25BcmdzIDIKc3RvcmUgMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAzCmJ0b2kKc3RvcmUgMgp0eG5hIEFwcGxpY2F0aW9uQXJncyA0CmJ0b2kKc3RvcmUgMwpsb2FkIDAKbG9hZCAxCmxvYWQgMgpsb2FkIDMKY2FsbHN1YiBjcmVhdGV0b2tlbl80CmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQpibnogbWFpbl9sMTYKdHhuIE9uQ29tcGxldGlvbgppbnRjXzEgLy8gT3B0SW4KPT0KYm56IG1haW5fbDE1CmVycgptYWluX2wxNToKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KYXNzZXJ0CmNhbGxzdWIgb3B0aW5fMQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTY6CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCj09CmFzc2VydApjYWxsc3ViIGNyZWF0ZV8wCmludGNfMSAvLyAxCnJldHVybgoKLy8gY3JlYXRlCmNyZWF0ZV8wOgpieXRlY18wIC8vICJhc3NldF9pZCIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBvcHRfaW4Kb3B0aW5fMToKdHhuIFNlbmRlcgpieXRlY18yIC8vICJjbGFpbV90aW1lIgppbnRjXzAgLy8gMAphcHBfbG9jYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWNfMSAvLyAiaGFzX29wdGVkX2luIgppbnRjXzAgLy8gMAphcHBfbG9jYWxfcHV0CnR4biBTZW5kZXIKYnl0ZWNfMSAvLyAiaGFzX29wdGVkX2luIgppbnRjXzEgLy8gMQphcHBfbG9jYWxfcHV0CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzI6Cmdsb2JhbCBDcmVhdG9yQWRkcmVzcwo9PQpyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV8zOgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKPT0KcmV0c3ViCgovLyBjcmVhdGVfdG9rZW4KY3JlYXRldG9rZW5fNDoKc3RvcmUgMTYKc3RvcmUgMTUKc3RvcmUgMTQKc3RvcmUgMTMKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzIKLy8gdW5hdXRob3JpemVkCmFzc2VydApieXRlY18wIC8vICJhc3NldF9pZCIKYXBwX2dsb2JhbF9nZXQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0Cml0eG5fYmVnaW4KcHVzaGludCAzIC8vIGFjZmcKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDEzCmV4dHJhY3QgMiAwCml0eG5fZmllbGQgQ29uZmlnQXNzZXROYW1lCmxvYWQgMTQKZXh0cmFjdCAyIDAKaXR4bl9maWVsZCBDb25maWdBc3NldFVuaXROYW1lCmxvYWQgMTUKaXR4bl9maWVsZCBDb25maWdBc3NldFRvdGFsCmxvYWQgMTYKaXR4bl9maWVsZCBDb25maWdBc3NldERlY2ltYWxzCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCml0eG5fZmllbGQgQ29uZmlnQXNzZXRNYW5hZ2VyCmludGNfMyAvLyAxMDAwCml0eG5fZmllbGQgRmVlCml0eG5fc3VibWl0CmJ5dGVjXzAgLy8gImFzc2V0X2lkIgppdHhuIENyZWF0ZWRBc3NldElECmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gdHJhbnNmZXJfdG9fY3JlYXRvcgp0cmFuc2ZlcnRvY3JlYXRvcl81OgpzdG9yZSAxOApzdG9yZSAxNwp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMwovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0Cml0eG5fYmVnaW4KaW50Y18yIC8vIGF4ZmVyCml0eG5fZmllbGQgVHlwZUVudW0KYnl0ZWNfMCAvLyAiYXNzZXRfaWQiCmFwcF9nbG9iYWxfZ2V0Cml0eG5fZmllbGQgWGZlckFzc2V0Cmdsb2JhbCBDcmVhdG9yQWRkcmVzcwppdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKbG9hZCAxNwppdHhuX2ZpZWxkIEFzc2V0QW1vdW50CmludGNfMyAvLyAxMDAwCml0eG5fZmllbGQgRmVlCml0eG5fc3VibWl0CnJldHN1YgoKLy8gb3B0aW5fYXNzZXQKb3B0aW5hc3NldF82OgpzdG9yZSAyMApzdG9yZSAxOQpsb2FkIDE5Cmd0eG5zIFNlbmRlcgp0eG4gU2VuZGVyCj09CmFzc2VydApsb2FkIDE5Cmd0eG5zIEFzc2V0QW1vdW50CmludGNfMCAvLyAwCj09CmFzc2VydApsb2FkIDE5Cmd0eG5zIEFzc2V0UmVjZWl2ZXIKdHhuIFNlbmRlcgo9PQphc3NlcnQKbG9hZCAxOQpndHhucyBYZmVyQXNzZXQKYnl0ZWNfMCAvLyAiYXNzZXRfaWQiCmFwcF9nbG9iYWxfZ2V0Cj09CmFzc2VydApyZXRzdWIKCi8vIGdldF9hc3NldF9pZApnZXRhc3NldGlkXzc6CnN0b3JlIDkKYnl0ZWNfMCAvLyAiYXNzZXRfaWQiCmFwcF9nbG9iYWxfZ2V0CnJldHN1YgoKLy8gZ2V0X2Fzc2V0X2Zyb21fZmF1Y2V0CmdldGFzc2V0ZnJvbWZhdWNldF84OgpzdG9yZSAyMwpzdG9yZSAyMgpzdG9yZSAyMQp0eG4gU2VuZGVyCmJ5dGVjXzEgLy8gImhhc19vcHRlZF9pbiIKYXBwX2xvY2FsX2dldAppbnRjXzAgLy8gMAo9PQpieiBnZXRhc3NldGZyb21mYXVjZXRfOF9sMgp0eG4gU2VuZGVyCmJ5dGVjXzIgLy8gImNsYWltX3RpbWUiCmludGNfMCAvLyAwCmFwcF9sb2NhbF9wdXQKdHhuIFNlbmRlcgpieXRlY18xIC8vICJoYXNfb3B0ZWRfaW4iCmludGNfMCAvLyAwCmFwcF9sb2NhbF9wdXQKdHhuIFNlbmRlcgpieXRlY18xIC8vICJoYXNfb3B0ZWRfaW4iCmludGNfMSAvLyAxCmFwcF9sb2NhbF9wdXQKZ2V0YXNzZXRmcm9tZmF1Y2V0XzhfbDI6Cmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKdHhuIFNlbmRlcgpieXRlY18yIC8vICJjbGFpbV90aW1lIgphcHBfbG9jYWxfZ2V0Cj4KYXNzZXJ0Cml0eG5fYmVnaW4KaW50Y18yIC8vIGF4ZmVyCml0eG5fZmllbGQgVHlwZUVudW0KYnl0ZWNfMCAvLyAiYXNzZXRfaWQiCmFwcF9nbG9iYWxfZ2V0Cml0eG5fZmllbGQgWGZlckFzc2V0CmxvYWQgMjEKdHhuYXMgQWNjb3VudHMKaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCmludGNfMCAvLyAwCml0eG5fZmllbGQgQW1vdW50CmludGNfMyAvLyAxMDAwCml0eG5fZmllbGQgRmVlCml0eG5fc3VibWl0CnR4biBTZW5kZXIKYnl0ZWNfMiAvLyAiY2xhaW1fdGltZSIKZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApsb2FkIDIyCisKYXBwX2xvY2FsX3B1dApyZXRzdWI=";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "create_token", desc: "", args: [{ type: "string", name: "asset_name", desc: "" }, { type: "string", name: "unit_name", desc: "" }, { type: "uint64", name: "total_supply", desc: "" }, { type: "uint64", name: "decimals", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "transfer_to_creator", desc: "", args: [{ type: "uint64", name: "amount", desc: "" }, { type: "asset", name: "aid", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "optin_asset", desc: "", args: [{ type: "axfer", name: "txn", desc: "" }, { type: "asset", name: "aid", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_asset_id", desc: "", args: [{ type: "asset", name: "aid", desc: "" }], returns: { type: "uint64", desc: "" } }),
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
        get_asset_from_faucet: async (args: {
            receiver: string;
            time: bigint;
            aid?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_asset_from_faucet"), { receiver: args.receiver, time: args.time, aid: args.aid === undefined ? await this._resolve("global-state", "asset_id") : args.aid }, txnParams, atc);
        }
    };
}
