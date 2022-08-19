import React, { useState, useEffect } from "react";
import constants from "../../../constants";
import { getStorageNetwork, setStorageNetwork } from "../../../service/storage";

import styles from "./Layout.module.css";

interface ILayout {
  children: JSX.Element;
}

const Layout = ({ children }: ILayout) => {
  const [network, setNetwork] = useState(constants.ROPSTEN)
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setNetwork(value)
    setStorageNetwork(value)
  };

  useEffect(() => {
    const storageNetwork = getStorageNetwork()
    setNetwork(storageNetwork)
  }, [])

  return (
    <div className={styles.layout} key={network}>
      <select value={network} className={styles.networks} onChange={handleChange}>
        {constants.NETWORKS.map((network: string) => (<option key={network} value={network.toLowerCase()}>{network}</option>))}
      </select>
      <div className={styles.wrapper}>
        <img src="/Logo.svg" className={styles.logo} alt="Log" />
        {children}
      </div>
    </div>
  );
};

export default Layout;
