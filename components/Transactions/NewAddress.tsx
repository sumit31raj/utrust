import React from "react";
import constants from "../../constants";
import { IAddress } from "../../interfaces";
import Button from "../common/Button";
import styles from "./Transactions.module.css";

interface INewAddressProps {
  newAddress: any,
  toggleModal: () => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleAdd: () => void
}

const NewAddress = ({ newAddress, toggleModal, handleChange, handleAdd }: INewAddressProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={toggleModal}>
          &times;
        </span>
        <form>
          <div className={styles.field}>
            <label htmlFor="address">Private Key</label>
            <input
              type="text"
              name="privateKey"
              placeholder="Enter Private Key"
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
