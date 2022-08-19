import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Button from "../common/Button";
import { ROUTES } from "../routes";
import CONSTANTS from "../../constants";
import useBlockchain from "../../hooks/useBlockchain";
import constants from "../../constants";
import NewAccountModal from "./NewAccountModal";
import { getStorage, getStorageNetwork, setStorage } from "../../service/storage";
import { IAccount } from "../../interfaces";
import Loader from "../common/Loader/Loader";

import styles from "./WalletDashboard.module.css";

const WalletDashboard = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [loader, setLoader] = useState(false)
  const [newAccount, setNewAccount] = useState<IAccount>(constants.DEFAULT_ACCOUNT);
  const router = useRouter();
  const network = getStorageNetwork()
  const { getAddress, getBalance, checkPrivateKey } = useBlockchain(network);

  const handleNavigateToSend = () => {
    router.push(ROUTES.SEND);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAccount((prevData: IAccount) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = async () => {
    if (newAccount.privateKey && checkPrivateKey(newAccount.privateKey)) {
      setLoader(true)
      const prevAccounts: IAccount[] = getStorage(constants.ACCOUNTS);
      const add = await getAddress(newAccount.privateKey);
      const newAcc = {
        address: add,
        privateKey: newAccount.privateKey,
        balance: await getBalance(add),
      };
      setAccounts([...accounts, newAcc]);
      prevAccounts.push(newAcc);
      setStorage(constants.ACCOUNTS, prevAccounts);
      setIsModal(false);
      setNewAccount(constants.DEFAULT_ACCOUNT);
      setLoader(false)
    } else {
      console.log("Invalid Private Key")
    }
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const getAccountDetails = async () => {
    const prevAccounts: IAccount[] = getStorage(constants.ACCOUNTS)
    return prevAccounts.map(async (account) => ({
      ...account,
      balance: await getBalance(account?.address)
    }))
  }

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoader(true)
      const promises = await getAccountDetails()
      const tempAccounts = await Promise.all(promises)
      setAccounts(tempAccounts);
      setLoader(false)
    };

    fetchAccounts();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          My Ethereum addresses{" "}
          <Button text={CONSTANTS.ADD} onClick={toggleModal} />
        </div>
        <div className={styles.cardBody}>
          {accounts.length ? (
            accounts.map((account, index) => (
              <div className={styles.transactionItem} key={index}>
                <h3 className={styles.address}>{account?.address}</h3>
                <h2 className={styles.amount}>
                  {(+account?.balance).toFixed(4)} <span>ETH</span>
                </h2>
              </div>
            ))
          ) : (
            <div className={styles.notFound}>
              <h3 className={styles.amount}>{constants.ADDRESS_NOT_FOUND}</h3>
            </div>
          )}
        </div>
        <div className={styles.cardFooter}>
          <p>Please copy the address from which you wish to send money.</p>
          <Button text={CONSTANTS.NEXT} onClick={handleNavigateToSend} />
        </div>
      </div>

      {isModal && (
        <NewAccountModal
          newAccount={newAccount}
          toggleModal={toggleModal}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />
      )}
    </>
  );
};

export default WalletDashboard;
