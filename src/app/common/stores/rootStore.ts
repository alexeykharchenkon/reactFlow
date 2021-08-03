import { createContext, useContext } from "react";
import { DataStore } from "@stores/dataStore";

interface RootStore {
    dataStore: DataStore;
}

export const rootStore: RootStore = {
    dataStore : new DataStore(),
}

export const StoreContext = createContext(rootStore);

export const useStore = () => ( useContext(StoreContext) );