/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DeductionState } from "../../typo/deduction/states";
import {
  Deduction,
  PaginatedDeductionResponse,
} from "../../typo/deduction/response";
import {
  AddDeductionParams,
  EditDeductionParams,
} from "../../typo/deduction/params";

const InitialEmpState: DeductionState = {
  deductions: [],
  curr_deduction: undefined,
  query_set: [],
  searching: false,
  pagination: undefined,
  task_error: undefined,
  task_finished: true,
};
const EmployeeSlice = createSlice({
  name: "deduction",
  initialState: InitialEmpState,
  reducers: {
    addDeductionRequested: (state, _: PayloadAction<AddDeductionParams>) => {
      state.task_finished = false;
    },
    setPagesize: (state, size: PayloadAction<number>) => {
      let page = 1;
      let number_of_pages = 1;
      if (state.pagination) {
        page = state.pagination?.current_page / state.pagination?.page_size;
        page = page * size.payload;
        page = Math.ceil(page);
        number_of_pages = Math.ceil(
          state.pagination.count / state.pagination.page_size
        );
      }

      state.pagination = {
        page_size: size.payload,
        next: state.pagination?.next,
        previous: state.pagination?.previous,
        count: state.pagination?.count ?? 0,
        current_page: 1,
        number_of_pages,
      };
    },

    addDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.task_finished = true;
      state.task_error = undefined;
      state.deductions.push(action.payload);
      state.curr_deduction = action.payload;
    },
    unfinishedAdd: (state, action: PayloadAction<string>) => {
      state.task_finished = true;
      state.task_error = action.payload;
    },
    listDeductionsRequested: (state) => {
      state.task_finished = false;
    },
    tryingToDelete: (state) => {
      state.task_finished = false;
    },
    deleteDeductionRequested: (__, _: PayloadAction<string>) => {},
    addSearched: (state, action: PayloadAction<Deduction[]>) => {
      state.query_set = action.payload;
    },
    deleteDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.task_finished = true;
      state.deductions.splice(state.deductions.indexOf(action.payload), 1);
    },
    unfinishedDelete: (_) => {
      // state.task_finished = true;
    },
    listDeductionDone: (
      state,
      payload: PayloadAction<PaginatedDeductionResponse>
    ) => {
      state.deductions = payload.payload.results;
      state.task_finished = true;
      state.task_finished = true;
      state.pagination = {
        ...payload.payload.pagination,
        page_size: state.pagination?.page_size ?? 10,
      };
    },
    unfinishedList: (state) => {
      state.task_finished = true;
      state.task_finished = true;
      state.deductions = [];
    },
    loadNextPageRequested: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
      if (state.pagination?.current_page) state.pagination.current_page++;
      else if (state.pagination) state.pagination.current_page = 1;
    },
    loadPrevPageRequested: (state, _: PayloadAction<string>) => {
      state.task_finished = false;
      if (state.pagination?.current_page) state.pagination.current_page--;
      else if (state.pagination) state.pagination.current_page = 1;
    },
    searching: (state, payload: PayloadAction<Deduction[]>) => {
      state.query_set = payload.payload;
      state.searching = true;
    },
    noSearchResult: (state) => {
      state.searching = false;
    },
    setCurrentDeduction: (
      state,
      payload: PayloadAction<Deduction | undefined>
    ) => {
      state.curr_deduction = payload.payload;
    },
    editDeductionRequested: (state, _: PayloadAction<EditDeductionParams>) => {
      state.task_finished = false;
    },
    editDeductionDone: (state, action: PayloadAction<Deduction>) => {
      state.task_finished = true;
      state.curr_deduction = action.payload;
    },
    resetCurrEmployee: (state) => {
      state.curr_deduction = undefined;
      state.task_finished = true;
    },
    unfinishedEdit: (_) => {
      // state.task_finished = true
    },
    closeDeductionTask: (state) => {
      state.task_finished = true;
      state.task_error = undefined;
    },
  },
});
export const {
  listDeductionsRequested,
  unfinishedAdd,
  listDeductionDone,
  unfinishedList,
  tryingToDelete,
  deleteDeductionRequested,
  deleteDeductionDone,
  unfinishedDelete,
  setCurrentDeduction,
  addDeductionRequested,
  addDeductionDone,
  editDeductionRequested,
  editDeductionDone,
  unfinishedEdit,
  resetCurrEmployee,
  searching,
  noSearchResult,
  loadNextPageRequested,
  loadPrevPageRequested,
  setPagesize,
  closeDeductionTask,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
