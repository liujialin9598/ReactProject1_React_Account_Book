import axios from "axios";

import { createSlice } from "@reduxjs/toolkit";

const billStore = createSlice({
  name: "billStore",

  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
    addBillList(state, action) {
      state.billList.push(action.payload);
    },
  },
});

export default billStore.reducer;

export const { setBillList, addBillList } = billStore.actions;

//编写异步
const fetchBillList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(res.data));
  };
};

const pushBillList = (data) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:8888/ka", data);
    dispatch(addBillList(res.data));
    console.log(res);
  };
};

export { fetchBillList, pushBillList };
