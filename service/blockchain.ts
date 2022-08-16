import { ethers } from "ethers";

let provider =  ethers.getDefaultProvider("ropsten");

const sendTransaction = async (tx: any) => {
  const prevAddress: any[] = JSON.parse(sessionStorage.getItem("addresses") || "[]");
  const privateKey = prevAddress.find(item => item.address === tx.from)?.privateKey
  let wallet = new ethers.Wallet(privateKey, provider);
  try {
    const txObj = await wallet.sendTransaction(tx);
    console.log("txObj : ", txObj);
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
  const prevAddress: any[] = JSON.parse(sessionStorage.getItem("addresses") || "[]");
  return amount < prevAddress.find(item => item.address === address)?.balance
}

export { provider, sendTransaction, getBalance, checkAddress, checkAmount };
