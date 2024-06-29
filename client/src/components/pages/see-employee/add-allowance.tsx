/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useAllowance } from "../../../hooks/allowance-hook";
import { useAppDispatch } from "../../../utils/custom-hook";
import {
  FormError,
  InputContainer,
  Label,
  Select,
  SelectOption,
} from "../../utils/form-elements/form.style";
import { Modal } from "../../utils/modal/modal";
import {
  AddBtn,
  AllowanceBody,
  AllowanceContainer,
  AllowanceForm,
} from "../../sections/add-allowance/add-allowance.style";
import { Title } from "../../sections/add_employee/add-employee.style";
import { useEffect } from "react";
import { listAllowancesRequested } from "../../../store/allowance/allowance-slice";
import {
  addEmpAllowanceRequested,
  closeEmployeeTask,
} from "../../../store/employee/employee-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useSalary } from "../../../hooks/salary-hook";
import { useEmployee } from "../../../hooks/employee-hook";
import { Outlet, useNavigate, useParams } from "react-router";
export const AddAllowanceToEmp = () => {
  //geting necessary data form the context , routers and the redux store
  const { allowances, curr_allowance } = useAllowance();
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { employee_id } = useParams();
  const { curr_emp } = useSalary();
  const { task_error, task_finished } = useEmployee();

  //fetching allowances from backend to add to employee
  useEffect(() => {
    dispatcher(listAllowancesRequested());
  }, []);

  useEffect(() => {
    if (curr_allowance) {
      dispatcher(listAllowancesRequested());
    }
  }, [curr_allowance, dispatcher]);

  // initialize the formik instance
  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      allowance_type: "",
      employee_id: employee_id || "",
    },
    onSubmit: (values) => {
      dispatcher(addEmpAllowanceRequested(values));
    },
  });

  //Adding a method to close modal  properly
  const clearTask = () => {
    dispatcher(closeEmployeeTask());
  };
  return (
    <Modal closeAction={clearTask}>
      <AllowanceContainer>
        <Outlet />
        <AllowanceBody>
          <Title>Adding Allowance to {curr_emp?.employee?.first_name}</Title>
          <AllowanceForm
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(e);
            }}
          >
            <InputContainer>
              <Label htmlFor="role">Select Allowance</Label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  gap: "1rem",
                }}
              >
                <Select
                  name="allowance_type"
                  style={{ flex: 2 }}
                  onChange={handleChange}
                >
                  <SelectOption value="" disabled selected={!curr_allowance}>
                    Select Allowance
                  </SelectOption>
                  {allowances.map(
                    (allowance) =>
                      allowance && (
                        <SelectOption
                          selected={allowance.id === curr_allowance?.id}
                          value={allowance.allowance_type}
                          key={allowance.id}
                        >
                          {allowance.allowance_type}
                        </SelectOption>
                      )
                  )}
                </Select>
                <AddBtn
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("add-new-allowance");
                  }}
                  style={{ flex: 1.2 }}
                >
                  {"Add New"}
                </AddBtn>
              </div>
              <FormError>
                {touched.allowance_type && errors.allowance_type ? (
                  <div>{errors.allowance_type}</div>
                ) : null}
              </FormError>
            </InputContainer>
            {task_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {" "}
                {task_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {!task_finished && !task_error ? <SmallSpinner /> : "Add"}
            </AddBtn>
          </AllowanceForm>
        </AllowanceBody>
      </AllowanceContainer>
    </Modal>
  );
};
