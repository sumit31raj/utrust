import { BigNumber, ethers } from "ethers";
import constants from "../constants";
import { IAddress } from "../interfaces";

let provider =  ethers.getDefaultProvider("ropsten");

interface ITransaction {
  from: string;
  to: string;
  value: BigNumber
}

const sendTransaction = async (tx: ITransaction) => {
  const prevAddress: IAddress[] = JSON.parse(sessionStorage.getItem(constants.ADDRESSES) || "[]");
  const privateKey = prevAddress.find(item => item.address === tx.from)?.privateKey
  let wallet = new ethers.Wallet(privateKey ? privateKey : "", provider);
  try {
    const txObj = await wallet.sendTransaction(tx);
    console.log("txHash", txObj.hash);
    return txObj
  } catch (error) {
    console.log("error : ", error);
  }
};

const getBalance = async (address: string) => {
  const balance = await provider.getBalance(address);
  const balanceInEth = ethers.utils.formatEther(balance);
  return balanceInEth;
};

const checkAddress = async (address: string) => {
  return address === ethers.utils.getAddress(address);
}

const checkAmount = (amount: string, address: string) => {
  const prevAddress: IAddress[] = JSON.parse(sessionStorage.getItem(constants.ADDRESSES) || "[]");
  const balance = prevAddress.find(item => item?.address === address)?.balance || "0"
  return amount <  balance
}

export { provider, sendTransaction, getBalance, checkAddress, checkAmount };
