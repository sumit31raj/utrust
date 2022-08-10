import React, { useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import Button from "../common/Button";
import CONSTANT from "../../constants";
import { ITransactionData } from "../../interfaces";

import styles from "./SendTransaction.module.css";
import constants from "../../constants";

const AddTransaction = () => {
  const [loader, setLoader] = useState<Boolean>(false);
  const [transactionData, setTransactionData] = useState<ITransactionData>(constants.FORM);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionData((prevData: ITransactionData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSend = () => {
    if (transactionData.from && transactionData.to && transactionData.amount) {
      setLoader(true);
      let provider = ethers.getDefaultProvider("ropsten");
      let wallet = new ethers.Wallet(CONSTANT.PRIVATE_KEY, provider);
      let tx = {
        from: transactionData.from,
        to: transactionData.to,
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther(transactionData.amount),
      };
        wallet.sendTransaction(tx).then((txObj) => {
          console.log("txObj : ", txObj);
          console.log("txHash", txObj.hash);
          setLoader(false);
          sessionStorage.setItem(
            "transactionData",
            JSON.stringify(transactionData)
          );
          router.push("/send/success");
        }).catch(error => {
          console.log('error : ', error)
        });
    } else {
      console.log("Invalid form");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        Please fill the form to send Ethereum
      </div>
      <div className={styles.cardBody}>
        <form>
          <div className={styles.field}>
            <label htmlFor="from">From</label>
            <input
              type="text"
              id="from"
              name="from"
              placeholder="Your Address"
              value={transactionData.from}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="to">To</label>
            <input
              type="text"
              id="to"
              name="to"
              placeholder="Destination Address"
              value={transactionData.to}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="address">Amount</label>
            <input
              type="text"
              name="amount"
              placeholder="Etherem amount"
              className={styles.amountInput}
              value={transactionData.amount}
              onChange={handleChange}
            />
          </div>
          <div className={styles.submitButton}>
            <Button text={CONSTANT.SEND} loader={loader} onClick={handleSend} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
