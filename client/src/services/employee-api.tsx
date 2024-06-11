import axios, { AxiosError } from "axios";
import { AddEmpParams } from "../typo/employee/params";
import { API } from "../config/api";
import { AddEmpResponse, EmployeeResponse } from "../typo/employee/response";
const accessToken = localStorage.getItem("accessToken");

const addEmp = async (values: AddEmpParams) => {
  const response = await axios
    .post<AddEmpResponse>(API + "/employee/add", values, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the authorization header
      },
    })
    .then((res) => {
      return {
        success: "Employee added successfully",
        code: res.status,
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return response;
};

const listEmployee = async () => {
  const employees = await axios
    .get<EmployeeResponse[]>(API + "/employee/list")
    .then((res) => res.data);
  return employees;
};

const EmployeeAPI = {
  addEmp,
  listEmployee,
};

export default EmployeeAPI;
