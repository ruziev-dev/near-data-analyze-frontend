import { makeAutoObservable, configure } from "mobx";
import nearAPI, { TPoolsInfoMap } from "../api/nearAPI";
import serverApi from "../api/serverApi";
import {
  IEpoch,
  TBaseData,
  TEpochValidators,
  TPoolHistory,
} from "../api/types";

export enum WINDOW {
  POOL = "Pool",
  EPOCH = "Epoch",
  BASE = "Base",
}

configure({
  enforceActions: "never",
});

class Store {
  currentView: WINDOW = WINDOW.BASE;

  isAppLoading = true;
  isFetch = true;

  baseInfo: null | TBaseData = null;
  poolsInfoMap: null | TPoolsInfoMap = null;

  selectedEpoch: null | IEpoch = null;
  epochValidators: null | TEpochValidators = null;

  selectedPool: null | string = null;
  poolHistory: null | TPoolHistory = null;

  constructor() {
    makeAutoObservable(this);
  }
  async initializeApp() {
    try {
      const data = await serverApi.getInitialData();
      this.baseInfo = data;
      const names = await nearAPI.getPoolDescriptionData();
      this.poolsInfoMap = names;
    } catch (error: any) {
      alert(error.message);
    }
    this.isAppLoading = false;
    this.isFetch = false;
  }

  async onSelectValidator(poolName: string) {
    this.isFetch = true;
    try {
      const data = await serverApi.getPoolHistory(poolName);
      this.poolHistory = data;
    } catch (error: any) {
      alert(error.message);
    }
    this.currentView = WINDOW.POOL;
    this.selectedPool = poolName;
    this.isFetch = false;
  }

  async onSelectEpoch(epochId: string) {
    this.isFetch = true;
    try {
      const data = await serverApi.getEpochValidators(epochId);
      this.epochValidators = data;
    } catch (error: any) {
      alert(error.message);
    }
    this.currentView = WINDOW.EPOCH;

    this.selectedEpoch =
      this.baseInfo?.epochs.find((epoch) => epoch.ID === epochId) || null;
    this.isFetch = false;
  }

  onPressHome() {
    this.currentView = WINDOW.BASE;
  }
}

export const store = new Store();
