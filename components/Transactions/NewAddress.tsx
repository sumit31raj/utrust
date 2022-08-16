import React from "react";
import constants from "../../constants";
import Button from "../common/Button";
import styles from "./Transactions.module.css";

const NewAddress = ({ newAddress, toggleModal, handleChange, handleAdd }: any) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={toggleModal}>
          &times;
        </span>
        <form>
          <div className={styles.field}>
            <label htmlFor="to">Address</label>
            <input
              type="text"
              id="to"
              name="address"
              placeholder="Address"
              value={newAddress.address}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="address">Private Key</label>
            <input
              type="text"
              name="privateKey"
              placeholder="Private Key"
              className={styles.amountInput}
              value={newAddress.privateKey}
              onChange={handleChange}
            />
          </div>
          <div className={styles.addButton}>
            <Button text={constants.ADD} onClick={handleAdd} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAddress;
