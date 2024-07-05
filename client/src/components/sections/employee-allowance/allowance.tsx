import {
  Caption,
  CustomTable,
  HeaderTitle,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
} from "../../utils/custom-table/custom-table";
import {
  AddButton,
  AllowanceBody,
  AllowanceContainer,
  AllowanceHeader,
  AllowanceTitle,
} from "./allowance.style";
import { getFormattedMonth } from "../../pages/salary/utils";
import { NoResult } from "../../utils/containers/containers.style";
import { ThreeDots } from "../../utils/loading/dots";
import { Outlet, useNavigate } from "react-router";
import { useSalary } from "../../../hooks/salary-hook";

export const EmployeeAllowance = () => {
  const { curr_emp, loading } = useSalary();
  const navigate = useNavigate();
  return (
    <AllowanceContainer>
      <AllowanceHeader>
        <Outlet />
        <AllowanceTitle>Employee Allowance</AllowanceTitle>
        <AddButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate("add-allowance");
          }}
        >
          Add
        </AddButton>
      </AllowanceHeader>
      <AllowanceBody>
        {loading ? (
          <ThreeDots size={2} />
        ) : curr_emp?.employee.payments.every(
            (payment) => payment.allowances.length === 0
          ) ? (
          <div>
            <NoResult>No allowances found for all month</NoResult>
          </div>
        ) : (
          curr_emp?.employee.payments.map((payment, index) => {
            return payment.allowances.length > 0 ? (
              <CustomTable key={index}>
                <thead>
                  <tr>
                    <Caption>
                      {getFormattedMonth(new Date(payment.month))}
                    </Caption>
                  </tr>
                  <TableHeader>
                    <HeaderTitle>Allowance Name</HeaderTitle>
                    <HeaderTitle>Allowance Value</HeaderTitle>
                    <HeaderTitle>Date of Given</HeaderTitle>
                  </TableHeader>
                </thead>
                <TableBody>
                  {payment.allowances.map((allowance, index) => {
                    return (
                      <TableRow key={index}>
                        <TableData>{allowance.allowance_type}</TableData>
                        <TableData>{allowance.allowance_rate}</TableData>
                        <TableData>{payment.payment_date}</TableData>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </CustomTable>
            ) : (
              <div>
                <Caption>{getFormattedMonth(new Date(payment.month))}</Caption>
                <NoResult>No Allowance</NoResult>
              </div>
            );
          })
        )}
      </AllowanceBody>
    </AllowanceContainer>
  );
};
