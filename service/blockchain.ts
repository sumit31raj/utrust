import { ethers, BigNumber as BigNum } from "ethers";
var BigNumber = require('big-number');

import constants from "../constants";
import { IAddress } from "../interfaces";
import { getStorage } from "./storage";

const provider =  ethers.getDefaultProvider("ropsten");

interface ITransaction {
  from: string;
  to: string;
  value: BigNum
}

const sendTransaction = async (tx: ITransaction) => {
  const prevAddress: IAddress[] = getStorage(constants.ADDRESSES);
  const privateKey = prevAddress.find(item => item.address === tx.from)?.privateKey
  const wallet = new ethers.Wallet(privateKey ? privateKey : "", provider);
  try {
    const txObj = await wallet.sendTransaction(tx);
    console.log("txHash", txObj.hash);
    return txObj
  } catch (error) {
    console.log("error : ", error);
  }
};

const getAddress = async (privateKey: string) => {
  const wallet = new ethers.Wallet(privateKey, provider);
  const address = await wallet.getAddress()
  return address
}

const getBalance = async (address: string) => {
  const balance = await provider.getBalance(address);
  const balanceInEth = ethers.utils.formatEther(balance);
  return balanceInEth;
};

const checkAddress = async (address: string) => {
  return ethers.utils.isAddress(address);
}

const checkAmount = (amount: string, address: string) => {
  const prevAddress: IAddress[] = getStorage(constants.ADDRESSES);
  const balance = prevAddress.find(item => item?.address === address)?.balance || "0"
  const amountBig = new BigNumber(parseInt(amount))
  const balanceBig = new BigNumber(parseInt(balance))
  return amountBig.lt(balanceBig)
}

export { provider, sendTransaction, getAddress, getBalance, checkAddress, checkAmount };
