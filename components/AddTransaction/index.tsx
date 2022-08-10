import React, { useState } from "react";
import Button from "../common/Button";
import styles from "./AddTransaction.module.css";
import { ethers } from "ethers";

const privateKey =
  "8a97e21074bbf8bd06ce23d83cef754b493471e30ed79b4b2288f019281941d2";
// let senderAddress = "0x970a8775c2D6d9E1C7c2904c685de752a1914105";
// let receiverAddress = "0xF02c1c8e6114b1Dbe8937a39260b5b0a374432bB";
// let amountInEther = "0.05";

const AddTransaction = ({ handleMoveStep }: any) => {
  const [loader, setLoader] = useState(false);
  const [transactionData, setTransactionData] = useState<any>({
    from: "",
    to: "",
    amount: "",
  });

  const handleChange = (e: any) => {
    setTransactionData((prevData: any) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSend = () => {
    if (transactionData.from && transactionData.to && transactionData.amount) {
      setLoader(true);
      let provider = ethers.getDefaultProvider("ropsten");
      let wallet = new ethers.Wallet(privateKey, provider);
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
        handleMoveStep("next");
      });
    } else {
      console.log("fields are required");
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
            <Button text={"Send"} loader={loader} onClick={handleSend} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
