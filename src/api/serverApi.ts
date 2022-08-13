import { Axios } from "axios";
import { TBaseData, TEpochValidators, TPoolHistory } from "./types";

const BASE_URL = "http://ut-72:3000/";
const axios = new Axios({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

class ServerApi {
  private async getFetch<T>(path: string = ""): Promise<T> {
    try {
      const response = axios.get(path);
      const { data } = await response;
      return JSON.parse(data);
    } catch (error) {
      console.log("getFetch: error ", error);
      throw error;
    }
  }
  async getInitialData() {
    return this.getFetch<TBaseData>();
  }
  async getEpochValidators(epochId: string) {
    const path = "/epoch/" + epochId;
    return this.getFetch<TEpochValidators>(path);
  }
  async getPoolHistory(poolid: string) {
    const path = "/poolid/" + poolid;
    return this.getFetch<TPoolHistory>(path);
  }
}

export default new ServerApi();
