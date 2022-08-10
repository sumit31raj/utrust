import React, { useMemo, useState, useEffect } from "react";
import AddTransaction from "../AddTransaction";
import Layout from "../common/Layout";
import Transactions from "../Transactions";
import TransactionSuccess from "../TransactionSuccess";
import styles from "./MainWrapper.module.css";
import { ethers } from "ethers";

const privateKey =
  "8a97e21074bbf8bd06ce23d83cef754b493471e30ed79b4b2288f019281941d2";
let senderAddress = "0x970a8775c2D6d9E1C7c2904c685de752a1914105";
let receiverAddress = "0xF02c1c8e6114b1Dbe8937a39260b5b0a374432bB";
let amountInEther = "0.05";

const MainWrapper = () => {
  const [step, setStep] = useState(1);
  let provider: any = ethers.getDefaultProvider('ropsten');
  
  useEffect(() => {
    if (window !== undefined) {
      provider = new ethers.providers.Web3Provider(window !== undefined && window?.ethereum);
    }
  }, [])
  

  const handleMoveStep = (type: string) => {
    setStep((prevStep) => (type === "next" ? prevStep + 1 : prevStep - 1));
  };

  const connectToMetamask = async () => {
    if (window !== undefined) {
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("accounts : ", accounts[0]);
      const balance = await provider.getBalance(accounts[0]);
      console.log("balance : ", balance);
      const balanceInEther = ethers.utils.formatEther(balance);
      console.log("balanceInEther : ", balanceInEther);
      const block = await provider.getBlockNumber();
      console.log("block : ", block);
    }
  };

  const sendTransaction = async () => {
    // let provider = ethers.getDefaultProvider('ropsten')
    let wallet = new ethers.Wallet(privateKey, provider);
    let tx = {
      from: senderAddress,
      to: receiverAddress,
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther(amountInEther),
    };
    wallet.sendTransaction(tx).then((txObj) => {
      console.log("txHash", txObj.hash);
    });
  };

  const renderToStep = () => {
    switch (step) {
      case 1:
        return <Transactions handleMoveStep={handleMoveStep} />;
      case 2:
        return <AddTransaction handleMoveStep={handleMoveStep} />;
      case 3:
        return <TransactionSuccess />;
      default:
        <></>;
    }
  };

  const stepData = useMemo(() => renderToStep(), [step]);

  return (
    <div className={styles.wrapper}>
      <button onClick={connectToMetamask}>Connect</button>
      <button onClick={sendTransaction}>Send</button>
      <Layout>{stepData}</Layout>
    </div>
  );
};

export default MainWrapper;
