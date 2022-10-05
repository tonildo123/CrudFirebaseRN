import { createStore, StoreCreator } from "redux";
import MyReducer from "./MyReducer";

const stored = createStore(MyReducer);

export default stored;