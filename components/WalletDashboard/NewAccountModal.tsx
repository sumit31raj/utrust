import React from "react";

import constants from "../../constants";
import { IAccount } from "../../interfaces";
import Button from "../common/Button";

import styles from "./WalletDashboard.module.css";

interface INewAccountProps {
  newAccount: IAccount;
  toggleModal: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdd: () => void;
}

const NewAccountModal = ({ newAccount, toggleModal, handleChange, handleAdd }: INewAccountProps) => {
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
              value={newAccount.privateKey}
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

export default NewAccountModal;
