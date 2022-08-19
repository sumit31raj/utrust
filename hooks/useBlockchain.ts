import { ethers, BigNumber as BigNum } from "ethers";
var BigNumber = require("big-number");

import { IAccount } from "../interfaces";
import { getStorage } from "../service/storage";
import constants from "../constants";

interface ITransaction {
  from: string;
  to: string;
  value: BigNum;
}

const useBlockchain = (network: string) => {
  const provider = ethers.getDefaultProvider(network, {
    etherscan: constants.ETHERSCAN
  });

  const sendTransaction = async (tx: ITransaction) => {
    const prevAddress: IAccount[] = getStorage(constants.ACCOUNTS);
    const privateKey = prevAddress.find(
      (item) => item.address === tx.from
    )?.privateKey;
    const wallet = new ethers.Wallet(privateKey ? privateKey : "", provider);
    try {
      const txObj = await wallet.sendTransaction(tx);
      console.log("txHash", txObj.hash);
      return txObj;
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const getAddress = async (privateKey: string) => {
    const wallet = new ethers.Wallet(privateKey, provider);
    const address = await wallet.getAddress();
    return address;
  };

  const getBalance = async (address: string) => {
    const balance = await provider.getBalance(address);
    const balanceInEth = ethers.utils.formatEther(balance);
    return balanceInEth;
  };

  const checkPrivateKey = (privateKey: string) => {
    try {
      return new ethers.Wallet(privateKey, );
    } catch (e) {
      return false
    }
  };

  const checkAddress = async (address: string) => {
    return ethers.utils.isAddress(address);
  };

  const checkAmount = (amount: string, address: string) => {
    const prevAddress: IAccount[] = getStorage(constants.ACCOUNTS);
    const balance =
      prevAddress.find((item) => item?.address === address)?.balance || "0";
    const amountBig = new BigNumber(parseInt(amount));
    const balanceBig = new BigNumber(parseInt(balance));
    return amountBig.lt(balanceBig);
  };

  return { provider, sendTransaction, getAddress, getBalance, checkAddress, checkAmount, checkPrivateKey };
};

export default useBlockchain;
