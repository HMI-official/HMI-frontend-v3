import { ReactElement } from "react";
import { FC } from "react";
import { ReactNode } from "react";
import { useContext, useEffect, useState, createContext } from "react";

interface IAccountContext {
  account: string;
  getAccount: () => Promise<string>;
}
export const AccountContext = createContext<IAccountContext | null>(null);

export const useAccount = () => useContext(AccountContext);
interface IAccountProviderProps {
  children: ReactNode;
}

export const AccountProvider: FC<IAccountProviderProps> = ({
  children,
}): ReactElement => {
  const [account, setAccount] = useState<string>("");
  const getAccount = async (): Promise<string> => {
    // web3는 옛날꺼고 ethereum이 요즘꺼라네
    if (!window?.ethereum) return "";
    // console.log("first");

    try {
      const response = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(response[0]);
      return response[0];
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const value = { account, getAccount };
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
