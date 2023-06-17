import * as LitJsSdk from "@lit-protocol/lit-node-client";

export const  getUnifiedAccessControlConditions = (pkpEthAddress) => {
    return [
        {
            conditionType: "evmBasic",
            contractAddress: "",
            standardContractType: "",
            chain: "hyperspace",
            method: "",
            parameters: [":userAddress"],
            returnValueTest: {
                comparator: "=",
                value:
                pkpEthAddress ,
            },
        },
    ];
}


export const hashBytes = async({ bytes }) => {
    const hashOfBytes = await crypto.subtle.digest("SHA-256", bytes);
    const hashOfBytesStr = LitJsSdk.uint8arrayToString(
        new Uint8Array(hashOfBytes),
        "base16"
    );
    return hashOfBytesStr;
}