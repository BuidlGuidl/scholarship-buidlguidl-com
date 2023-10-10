const contracts = {
  1: [
    {
      chainId: "1",
      name: "mainnet",
      contracts: {
        YourContract: {
          address: "0x18AE7c074729504841221018Dfd923250da9F3fd",
          abi: [
            {
              inputs: [],
              name: "ensContract",
              outputs: [
                {
                  internalType: "contract ENSContract",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "newName",
                  type: "string",
                },
              ],
              name: "setName",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        YourContract: {
          address: "0xed12bE400A07910E4d4E743E4ceE26ab1FC9a961",
          abi: [
            {
              inputs: [],
              name: "ensContract",
              outputs: [
                {
                  internalType: "contract ENSContract",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "newName",
                  type: "string",
                },
              ],
              name: "setName",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
