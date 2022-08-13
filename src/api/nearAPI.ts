import { Axios } from "axios";

const BASE_URL = "https://rpc.mainnet.near.org";
const axios = new Axios({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const poolNamesContractCall = {
  jsonrpc: "2.0",
  id: "dontcare",
  method: "query",
  params: {
    request_type: "call_function",
    finality: "final",
    account_id: "name.near",
    method_name: "get_all_fields",
    args_base64: "eyJmcm9tX2luZGV4IjogMCwgImxpbWl0IjogMTAwfQ==",
  },
};

export type TResponse = {
  jsonrpc: string;
  result: {
    block_hash: string;
    block_height: number;
    logs: [];
    result: number[];
  };
  id: string;
};

export type TPoolInfo = {
  country_code?: string;
  country?: string;
  description?: string;
  email?: string;
  name?: string;
  telegram?: string;
  twitter?: string;
  url?: string;
};

export type TPoolsInfoMap = { [key: string]: TPoolInfo };

class NearApi {
  async getPoolDescriptionData(): Promise<TPoolsInfoMap> {
    try {
      const response = axios.post<string>(
        "",
        JSON.stringify(poolNamesContractCall)
      );
      const { data: dataString } = await response;
      const data: TResponse = JSON.parse(dataString);
      const stringResp = String.fromCharCode(...data.result.result);
      return JSON.parse(stringResp);
    } catch (error) {
      console.warn("NearApi: getNames ", error);
      throw error;
    }
  }
}

export default new NearApi();
