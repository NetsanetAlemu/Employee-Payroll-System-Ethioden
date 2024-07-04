/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionBtnsContainer,
  AddButton,
  DeleteButton,
  EditButton,
  PositionListBody,
  PositionListHeader,
  Title,
} from "../positions/position.style";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { ThreeDots } from "../../utils/loading/dots";
import { NoResult } from "../../utils/no-result/no-result";
import {
  Caption,
  CustomTable,
  HeaderTitle,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeduction } from "../../../hooks/deduction-hook";
import { listDeductionsRequested } from "../../../store/deduction/deduction-slice";
export const DeductionPage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const deduction = useDeduction();
  const navigate = useNavigate();
  useEffect(() => {
    dispatcher(listDeductionsRequested());
  }, []);
  return (
    <MainContainer>
      <PositionListHeader>
        <Title>Deduction</Title>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-deduction");
            dispatcher(listDeductionsRequested());
          }}
        >
          Add Deduction
        </AddButton>
      </PositionListHeader>
      <PositionListBody>
        <Outlet />
        {!employee.task_finished ? (
          <ThreeDots size={2} />
        ) : deduction.deductions.length === 0 ? (
          <div>
            <NoResult text="No deductions found" />
          </div>
        ) : (
          <CustomTable>
            <Caption>List of Deductions</Caption>
            <TableHeader>
              <HeaderTitle>Deduction Name</HeaderTitle>
              <HeaderTitle>Deduction Rate</HeaderTitle>
              <HeaderTitle>Date of Start</HeaderTitle>
              <HeaderTitle>Date of End</HeaderTitle>
              <HeaderTitle>Actions</HeaderTitle>
            </TableHeader>
            <TableBody>
              {deduction.deductions.map((deduction, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{deduction.deduction_type}</TableData>
                    <TableData>{deduction.deduction_rate}</TableData>
                    <TableData>
                      {deduction.date_of_start?.split("T")[0]}
                    </TableData>
                    {deduction.date_of_end ? (
                      <TableData>{deduction.date_of_end}</TableData>
                    ) : (
                      <TableData>Not ended</TableData>
                    )}

                    <ActionBtnsContainer>
                      <EditButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/edit-deduction/${deduction.id}`);
                          dispatcher(listDeductionsRequested());
                        }}
                      >
                        <MdOutlineEdit />
                        Edit
                      </EditButton>
                      <DeleteButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // position.deletePosition(position.id);
                          dispatcher(listDeductionsRequested());
                        }}
                      >
                        <RiDeleteBin6Line />
                        Delete
                      </DeleteButton>
                    </ActionBtnsContainer>
                  </TableRow>
                );
              })}
            </TableBody>
          </CustomTable>
        )}
      </PositionListBody>
    </MainContainer>
  );
};