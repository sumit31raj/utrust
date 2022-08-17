import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Button from "../common/Button";
import { ROUTES } from "../routes";
import CONSTANTS from "../../constants";
import useBlockchain from "../../hooks/useBlockchain";
import constants from "../../constants";
import NewAddress from "./NewAddress";
import { getStorage, getStorageNetwork, setStorage } from "../../service/storage";
import { IAddress } from "../../interfaces";

import styles from "./Transactions.module.css";

const Transactions = () => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [newAddress, setNewAddress] = useState<IAddress>(constants.NEW_ADDRESS);
  const router = useRouter();
  const network = getStorageNetwork()
  const { getAddress, getBalance } = useBlockchain(network);

  const handleNavigateToSend = () => {
    router.push(ROUTES.SEND);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress((prevData: IAddress) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = async () => {
    if (newAddress.privateKey) {
      const prevAddress: IAddress[] = getStorage(constants.ADDRESSES);
      const add = await getAddress(newAddress.privateKey);
      const address = {
        address: add,
        privateKey: newAddress.privateKey,
        balance: await getBalance(add),
      };
      setAddresses([...addresses, address]);
      prevAddress.push(address);
      setStorage(constants.ADDRESSES, prevAddress);
      setIsModal(false);
      setNewAddress(constants.NEW_ADDRESS);
    }
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      const prevAddress: IAddress[] = getStorage(constants.ADDRESSES);
      const tempAccounts: IAddress[] = [];
      for (let index = 0; index < prevAddress?.length; index++) {
        const balance = await getBalance(prevAddress[index]?.address);
        tempAccounts.push({ ...prevAddress[index], balance: balance });
      }
      setAddresses(tempAccounts);
    };

    fetchAddresses();
  }, []);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          My Ethereum addresses{" "}
          <Button text={CONSTANTS.ADD} onClick={toggleModal} />
        </div>
        <div className={styles.cardBody}>
          {addresses.length ? (
            addresses.map((account, index) => (
              <div className={styles.transactionItem} key={index}>
                <h3 className={styles.address}>{account?.address}</h3>
                <h2 className={styles.amount}>
                  {(+account?.balance).toFixed(4)} <span>ETH</span>
                </h2>
              </div>
            ))
          ) : (
            <div className={styles.notFound}>
              <h3 className={styles.amount}>{"Address not found"}</h3>
            </div>
          )}
        </div>
        <div className={styles.cardFooter}>
          <p>Please copy the address from which you wish to send money.</p>
          <Button text={CONSTANTS.NEXT} onClick={handleNavigateToSend} />
        </div>
      </div>

      {isModal && (
        <NewAddress
          newAddress={newAddress}
          toggleModal={toggleModal}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />
      )}
    </>
  );
};

export default Transactions;
