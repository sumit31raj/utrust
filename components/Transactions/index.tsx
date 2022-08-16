import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Button from "../common/Button";
import { ROUTES } from "../routes";
import CONSTANTS from "../../constants";
import { checkAddress, getBalance } from "../../service/blockchain";
import constants from "../../constants";
import NewAddress from "./NewAddress";

import styles from "./Transactions.module.css";

const Transactions = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [newAddress, setNewAddress] = useState(constants.NEW_ADDRESS);
  const router = useRouter();

  const handleNavigateToSend = () => {
    router.push(ROUTES.SEND);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress((prevData: any) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = async () => {
    if (
      newAddress.address &&
      newAddress.privateKey &&
      checkAddress(newAddress.address)
    ) {
      const prevAddress: any[] = JSON.parse(
        sessionStorage.getItem(constants.ADDRESSES) || "[]"
      );
      const address = {
        address: newAddress.address,
        privateKey: newAddress.privateKey,
        balance: await getBalance(newAddress.address),
      };
      setAddresses([...addresses, address]);
      prevAddress.push(address);
      sessionStorage.setItem(constants.ADDRESSES, JSON.stringify(prevAddress));
      setIsModal(false);
      setNewAddress(constants.NEW_ADDRESS);
    }
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    const prevAddress: any[] = JSON.parse(
      sessionStorage.getItem(constants.ADDRESSES) || "[]"
    );
    setAddresses(prevAddress);
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
                  {account?.balance} <span>ETH</span>
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
