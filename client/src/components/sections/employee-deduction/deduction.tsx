import {
  CustomTable,
  HeaderTitle,
  TableBody,
  Caption,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import {
  AddButton,
  DeductionBody,
  DeductionContainer,
  DeductionHeader,
  DeductionTitle,
} from "./deduction.style";
import { useAppSelector } from "../../../utils/custom-hook";
import { getFormattedMonth } from "../salary/utils";
import { NoResult } from "../../utils/containers/containers.style";
import { useModal } from "../../../hooks/modal-hook";
import { ADD_DEDUCTION } from "../../../constants/tasks";

export const EmployeeDeduction = () => {
  const { curr_emp } = useAppSelector((state) => state.salary);
  const { openModal } = useModal();
  return (
    <DeductionContainer>
      <DeductionHeader>
        <DeductionTitle>Employee Deduction</DeductionTitle>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(ADD_DEDUCTION);
          }}
        >
          Add
        </AddButton>
      </DeductionHeader>
      <DeductionBody>
        {curr_emp?.employee.payments.map((payment, index) => {
          return payment.allowances.length > 0 ? (
            <CustomTable key={index}>
              <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
              <TableHeader>
                <HeaderTitle>Deduction Name</HeaderTitle>
                <HeaderTitle>Deduction Value</HeaderTitle>
                <HeaderTitle>Date of Given</HeaderTitle>
              </TableHeader>

              <TableBody>
                {payment.deductions.map((deduction, index) => {
                  return (
                    <TableRow key={index}>
                      <TableData>{deduction.deduction_type}</TableData>
                      <TableData>{deduction.deduction_rate}</TableData>
                      <TableData>
                        {new Date(payment.payment_date).toLocaleDateString()}
                      </TableData>
                    </TableRow>
                  );
                })}
              </TableBody>
            </CustomTable>
          ) : (
            <div>
              <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
              <NoResult>No Deduction</NoResult>
            </div>
          );
        })}
      </DeductionBody>
    </DeductionContainer>
  );
};