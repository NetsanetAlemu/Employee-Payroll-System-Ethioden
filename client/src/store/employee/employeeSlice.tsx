/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmployeeState } from "../../typo/employee/states";
import { AddEmpParams } from "../../typo/employee/params";
import { EmployeeResponse } from "../../typo/employee/response";

const InitialEmpState: EmployeeState = {
  adding: false,
  employees: [],
  task: undefined,
  loading: false,
};
const EmployeeSlice = createSlice({
  name: "employee",
  initialState: InitialEmpState,
  reducers: {
    addEmpRequested: (state, _: PayloadAction<AddEmpParams>) => {
      state.adding = true;
    },
    addEmpDone: (state, payload: PayloadAction<EmployeeResponse>) => {
      state.employees.push(payload.payload);
      state.adding = false;
      state.task = undefined;
    },
  },
});
export const { addEmpRequested, addEmpDone } = EmployeeSlice.actions;

export default EmployeeSlice.reducer;