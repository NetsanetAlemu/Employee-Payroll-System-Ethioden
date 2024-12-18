import axios, { AxiosError } from "axios";
import {
  AddAllowanceToEmployeesParams,
  AddDeductionToEmployeesParams,
  AddEmpParams,
  RemoveSalaryAssetParams,
  UpdateEmployementContract,
} from "../typo/employee/params";
import api from "../config/api";
import {
  Contract,
  Employee,
  EmployeeResponse,
  Profile,
} from "../typo/employee/response";
import { BaseResponse } from "../typo/utils/response";
import { AddOvertimeToEmpParams } from "../typo/overtime/params";

const addEmp = async (values: AddEmpParams) => {
  const response = await api
    .post<EmployeeResponse>("/employee/add", values)
    .then((res) => {
      return {
        success: "Employee added successfully",
        code: res.status,
        employee: res.data,
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
export interface Pagination {
  next: string | undefined;
  previous: string | undefined;
  count: number;
  page_size: number;
  current_page: number;
  number_of_pages: number;
}

export interface PaginatedEmpResponse extends BaseResponse {
  count: number;
  results: Employee[];
  pagination: Pagination;
}

export interface PaginatedBackEndResponse {
  count: number;
  results: Employee[];
  next: string | null;
  previous: string | null;
  page_size: number;
  current_page: number;
  number_of_pages: number;
  status: number;
}

const listEmployee = async (pageUrl?: string) => {
  const endpoint = pageUrl || "/employee/list";
  const employees = await api
    .get<PaginatedBackEndResponse>(endpoint)
    .then((res) => {
      return {
        results: res.data.results,
        pagination: {
          next: res.data.next,
          previous: res.data.previous,
          count: res.data.count,
          page_size: res.data.page_size,
          current_page: res.data.current_page,
          number_of_pages: res.data.number_of_pages,
          type: "employee",
        },
        code: res.status,
        success: "Success returned employees",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return employees;
};

const getEmployee = async (employee_id: string) => {
  const employees = await api
    .get("employee/get/" + employee_id)
    .then((res) => {
      return {
        employee: res.data,
        code: res.status,
        success: "Success returned employees",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return employees;
};

const addAllowance = async (values: AddAllowanceToEmployeesParams) => {
  const employees = await api
    .patch<BaseResponse>(
      "/employee/allowance/add/" +
        values.employee_id +
        "/" +
        values.allowance_type +
        values.query_string
    )
    .then((res) => {
      return {
        employee: res.data,
        code: res.status,
        success: "Success returned employees",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return employees;
};

const addDeduction = async (values: AddDeductionToEmployeesParams) => {
  const employees = await api
    .patch<BaseResponse>(
      "/employee/deduction/add/" +
        values.employee_id +
        "/" +
        values.deduction_type +
        values.query_string
    )
    .then((res) => {
      return {
        employee: res.data,
        code: res.status,
        success: "Success returned employees",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return employees;
};

const addOvertime = async (values: AddOvertimeToEmpParams) => {
  const employees = await api
    .patch<BaseResponse>(
      "/employee/overtime/add/" +
        values.employee_id +
        "/" +
        values.overtime_type +
        values.query_params,
      {
        overtime: values.overtime_type,
        start_time: values.start_time,
        end_time: values.end_time,
      }
    )
    .then((res) => {
      return {
        employee: res.data,
        code: res.status,
        success: "Success returned employees",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return employees;
};

const uploadDocument = async (employee_id: string, formData: FormData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await api
    .post(`/employee/contract/${employee_id}`, formData, config)
    .then((response) => {
      return response.data.profile_picture;
    })
    .catch((error) => {
      return error.message;
    });

  return response;
};

export interface EditEmployeeParams extends AddEmpParams {
  id: string | undefined;
}

const editEmployee = async (
  empployee_id: string,
  values: EditEmployeeParams
) => {
  const response = await api
    .put<EmployeeResponse[]>("/employee/edit/" + empployee_id, values)
    .then((res) => {
      return {
        success: "Employee updated successfully",
        code: res.status,
        employee: res.data,
      };
    })
    .catch((err: AxiosError) => {
      for (const value of Object.values(
        (err.response?.data as { [key: string]: unknown }) || {}
      ))
        return {
          error: value,
          code: err.response?.status,
        } as { error: string; code: number };
    });
  return response;
};

const removeSalaryAsset = async (values: RemoveSalaryAssetParams) => {
  const employees = await api
    .put<BaseResponse>(
      "/employee/remove/" +
        values.employee_id +
        "/" +
        values.asset_type +
        "/" +
        values.asset_id +
        values.qury_string
    )
    .then((res) => {
      return {
        employee: res.data,
        code: res.status,
        success: "Success returned employees",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return employees;
};

const getProfilePicture = async (employee_id: string) => {
  const response = await api
    .get<Profile>("/user/profile" + employee_id)
    .then((res) => {
      return {
        profile: res.data,
        code: res.status,
        success: "Successfully returned profile picture",
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

const updatEmployementAgreement = async (values: UpdateEmployementContract) => {
  const response = await axios
    .put<Contract>("/user/profile/" + values.employee_id, values.file_url, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return {
        success: "Employement contract updated successfully",
        code: res.status,
        profile: res.data,
      };
    })
    .catch((err: AxiosError) => {
      for (const value of Object.values(
        (err.response?.data as { [key: string]: unknown }) || {}
      ))
        return {
          error: value,
          code: err.response?.status,
        } as { error: string; code: number };
    });
  return response;
};

const deleteEmployee = async (empployee_id: string) => {
  const response = await api
    .delete<BaseResponse>("/employee/delete/" + empployee_id)
    .then((res) => {
      return {
        success: "Employee deleted successfully",
        code: res.status,
        data: res.data,
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

const getTotalEmployee = async () => {
  const employee = await api
    .get("/employee/total")
    .then((res) => {
      return {
        total: res.data.total,
        code: res.status,
        success: "Success returned allowances",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return employee;
};

const EmployeeAPI = {
  addEmp,
  listEmployee,
  editEmployee,
  deleteEmployee,
  addAllowance,
  addDeduction,
  addOvertime,
  getProfilePicture,
  updatEmployementAgreement,
  uploadDocument,
  getTotalEmployee,
  getEmployee,
  removeSalaryAsset,
};

export default EmployeeAPI;
