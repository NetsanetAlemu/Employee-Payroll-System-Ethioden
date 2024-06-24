import { AxiosError } from "axios";
import api from "../config/api";
import { AddPositionParams, EditPositionParams } from "../typo/position/params";
import { CustomResponse } from "../typo/utils/response";
import { AddPositionResponse, Position } from "../typo/position/response";

const addPosition = async (values: AddPositionParams) => {
  const response = await api
    .post("/employee/position/add", values)
    .then((res) => {
      return {
        success: "Position added successfully",
        code: res.status,
        position: res.data,
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

export interface PaginatedPositionResponse extends CustomResponse {
  count: number;
  results: Position[];
  pagination: Pagination;
}

export interface PaginatedBackEndResponse {
  count: number;
  results: Position[];
  next: string | null;
  previous: string | null;
  status: number;
}

const listPositions = async (pageUrl?: string) => {
  const endpoint = pageUrl || "/employee/position/list";

  const positions = await api
    .get<PaginatedBackEndResponse>(endpoint)
    .then((res) => {
      console.log(res);
      return {
        results: res.data,
        pagination: {
          next: res.data.next,
          previous: res.data.previous,
          count: res.data.count,
        },
        code: res.status,
        success: "Success returned positions",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });

  return positions;
};

const editPosition = async (
  position_id: string,
  values: EditPositionParams
) => {
  const response = await api
    .put<AddPositionResponse[]>("/employee/edit/" + position_id, values)
    .then((res) => {
      return {
        success: "Position updated successfully",
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

const deletePosition = async (empployee_id: string) => {
  const response = await api
    .delete("/employee/position/delete/" + empployee_id)
    .then((res) => {
      return {
        success: "Position deleted successfully",
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

const PositionAPI = {
  listPositions,
  editPosition,
  deletePosition,
  addPosition,
};

export default PositionAPI;