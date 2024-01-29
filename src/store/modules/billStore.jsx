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
  },
});

export default billStore.reducer;

export const { setBillList } = billStore.actions;

//编写异步
const fetchBillList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8888/ka");
    dispatch(setBillList(res.data));
  };
};

export { fetchBillList };
