import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import Button from "../common/Button";
import CONSTANT from "../../constants";
import { ITransactionData } from "../../interfaces";
import constants from "../../constants";
import {
  checkAddress,
  checkAmount,
  sendTransaction,
} from "../../service/blockchain";

import styles from "./SendTransaction.module.css";

const AddTransaction = () => {
  const [loader, setLoader] = useState<Boolean>(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [transactionData, setTransactionData] = useState<ITransactionData>(
    constants.TRANSACTION_FORM
  );
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTransactionData((prevData: ITransactionData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const prevAddress: any[] = JSON.parse(
      sessionStorage.getItem(constants.ADDRESSES) || "[]"
    );
    setAddresses(prevAddress);
  }, []);

  const handleSend = async () => {
    if (
      transactionData.from &&
      transactionData.to &&
      transactionData.amount &&
      checkAddress(transactionData.to)
    ) {
      if (checkAmount(transactionData.amount, transactionData.from)) {
        setLoader(true);
        let tx = {
          from: transactionData.from,
          to: transactionData.to,
          value: ethers.utils.parseEther(transactionData.amount),
        };
        try {
          const transaction = await sendTransaction(tx);
          console.log("transaction success : ", transaction);
          setLoader(false);
          sessionStorage.setItem(
            constants.TRANSACTION_DATA,
            JSON.stringify(transactionData)
          );
          router.push("/send/success");
        } catch (error) {
          console.log("error : ", error);
          setLoader(false);
        }
      } else {
        console.log("Invalid amount");
      }
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
            <select
              name="from"
              id="from"
              value={transactionData.from}
              onChange={handleChange}
            >
              <option selected disabled value={""} hidden>
                Your Address
              </option>
              {addresses.map((account, index) => (
                <option key={index} value={account.address}>
                  {account.address}
                </option>
              ))}
            </select>
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
