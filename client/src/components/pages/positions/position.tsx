/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionBtnsContainer,
  AddButton,
  DeleteButton,
  EditButton,
  PositionListBody,
  PositionListHeader,
  SuspendButton,
  Title,
} from "./position.style";
import {
  closePositionRequested,
  deletePositionRequested,
  listPositionsRequested,
  openPositionRequested,
} from "../../../store/position/position-slice";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
import { MainContainer } from "../../utils/pages-utils/containers.style";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { ThreeDots } from "../../utils/loading/dots";
import { usePosition } from "../../../hooks/position-hook";
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
import { MdOutlineClose, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { IoOpenOutline } from "react-icons/io5";
export const PositionPage = () => {
  const employee = useAppSelector((state) => state.employee);
  const dispatcher = useAppDispatch();
  const { task_error, task_finished, positions } = usePosition();
  const DELETE = "delete";
  const CLOSE = "close";
  const [action, setAction] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatcher(listPositionsRequested());
  }, []);
  return (
    <MainContainer>
      <PositionListHeader>
        <Title>Postions</Title>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-position");
            dispatcher(listPositionsRequested());
          }}
        >
          Add Position
        </AddButton>
      </PositionListHeader>
      <PositionListBody>
        <Outlet />
        {!employee.task_finished ? (
          <ThreeDots size={2} />
        ) : positions.length === 0 ? (
          <div>
            <NoResult text="Not Positions found" />
          </div>
        ) : (
          <CustomTable>
            <Caption>List of Positions</Caption>
            <TableHeader>
              <HeaderTitle>Position Name</HeaderTitle>
              <HeaderTitle>Initial Salary</HeaderTitle>
              <HeaderTitle>Date of Start</HeaderTitle>
              <HeaderTitle>Status</HeaderTitle>
              <HeaderTitle>Date of End</HeaderTitle>
              <HeaderTitle>Actions</HeaderTitle>
            </TableHeader>
            <TableBody>
              {positions.map((position, index) => {
                return (
                  <TableRow key={index}>
                    <TableData>{position.position_name}</TableData>
                    <TableData>{position.basic_salary}</TableData>
                    <TableData> {position.start_date} </TableData>
                    <TableData>
                      {position.end_date ? (
                        <span
                          style={{
                            color: "#f45",
                            fontStyle: "italic",
                          }}
                        >
                          Closed
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "#04d574",
                            fontStyle: "italic",
                          }}
                        >
                          Active
                        </span>
                      )}{" "}
                    </TableData>
                    <TableData>
                      {position.end_date ? (
                        position.end_date
                      ) : (
                        <i>Not Endded</i>
                      )}
                    </TableData>
                    <ActionBtnsContainer>
                      <EditButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(`/edit-position/${position.id}`);
                          dispatcher(listPositionsRequested());
                        }}
                      >
                        <MdOutlineEdit />
                        Edit
                      </EditButton>
                      <SuspendButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setAction(CLOSE);
                          position.end_date
                            ? dispatcher(openPositionRequested(position.id))
                            : dispatcher(closePositionRequested(position.id));
                        }}
                      >
                        {action === CLOSE && !task_error && !task_finished ? (
                          <SmallSpinner />
                        ) : position.end_date ? (
                          <>
                            <IoOpenOutline />
                            Resume
                          </>
                        ) : (
                          <>
                            <MdOutlineClose />
                            Close
                          </>
                        )}
                      </SuspendButton>
                      <DeleteButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setAction(DELETE);
                          dispatcher(deletePositionRequested(position.id));
                        }}
                      >
                        {action === DELETE && !task_error && !task_finished ? (
                          <SmallSpinner />
                        ) : (
                          <>
                            <RiDeleteBin6Line />
                            Delete
                          </>
                        )}
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
