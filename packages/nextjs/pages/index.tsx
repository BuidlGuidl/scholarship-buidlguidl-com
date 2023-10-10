import { useEffect, useState } from "react";
import oldTxns from "./oldTxns.json";
import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address, AddressInput, Balance, EtherInput } from "~~/components/scaffold-eth";
import {
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventHistory,
} from "~~/hooks/scaffold-eth";

console.log("oldTxns", oldTxns);

const Home: NextPage = () => {
  const { address } = useAccount();

  const { data: canSendEther } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "canSendEther",
    args: [address],
  });

  const { data: yourContract } = useDeployedContractInfo("YourContract");

  const { data: events, isLoading: isLoadingEvents } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "EtherSent",
    // Specify the starting block number from which to read events, this is a bigint.
    fromBlock: 18321821n,
    blockData: true,
    // Apply filters to the event based on parameter names and values { [parameterName]: value },
    //filters: { premium: true }
    // If set to true it will return the transaction data for each event (default: false),
    //transactionData: true,
    // If set to true it will return the receipt data for each event (default: false),
    //receiptData: true
  });

  const [sendEventRender, setSendEventRender] = useState([<div key="loading">loading</div>]);

  useEffect(() => {
    console.log("rendering events", events);
    const newRender = [];
    if (events) {
      for (let i = 0; i < events?.length; i++) {
        if (events && events[i] && events[i].args) {
          newRender.push(
            <div
              key={events[i].args.recipient + "_" + events[i].args.amount}
              className="card w-96 bg-base-100 shadow-xl w-[600px] items-center m-3"
            >
              <div className="card-body">
                <div className="flex flex-row p-2">
                  <div>
                    Sent <span className="font-bold">{formatEther(events[i].args.amount || 0n)}</span> to{" "}
                  </div>
                  <div className="ml-1">
                    <Address address={events[i].args.recipient} />
                  </div>
                </div>
              </div>
            </div>,
          );
        }
      }
    }

    const flippedTxns = oldTxns.reverse();

    for (let i = 0; i < flippedTxns.length; i++) {
      if (flippedTxns[i].from == "0x924e029aa245abadc5ebd379457eaa48cf0e4422") {
        newRender.push(
          <div className="card w-96 bg-base-100 shadow-xl w-[600px] items-center m-3">
            <div className="card-body">
              <div className="flex flex-row p-2">
                <div>
                  Sent <span className="font-bold">{formatEther(BigInt(flippedTxns[i].value))}</span> to{" "}
                </div>
                <div className="ml-1">
                  <Address address={flippedTxns[i].to} />
                </div>
              </div>
            </div>
          </div>,
        );
      }
    }

    setSendEventRender(newRender);
  }, [isLoadingEvents]);

  const [etherAmount, setEtherAmount] = useState("");
  const [toAddress, setToAddress] = useState("");

  const { writeAsync: sendEther } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "sendEther",
    args: [toAddress, parseEther(etherAmount)],
  });

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <Address address={yourContract?.address} /> <Balance address={yourContract?.address} />
      </div>
      {canSendEther ? (
        <div className="flex items-center flex-col flex-grow pt-10">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              send{" "}
              <EtherInput
                placeholder="amount of ether"
                value={etherAmount}
                onChange={v => {
                  setEtherAmount(v);
                }}
              />{" "}
              to{" "}
              <AddressInput
                placeholder="address"
                value={toAddress}
                onChange={v => {
                  setToAddress(v);
                }}
              />
              <div className="card-actions justify-end p-4">
                <button className="btn btn-primary" onClick={() => sendEther()}>
                  Send Scholarship
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex items-center flex-col flex-grow pt-10">{sendEventRender}</div>
    </>
  );
};

export default Home;
