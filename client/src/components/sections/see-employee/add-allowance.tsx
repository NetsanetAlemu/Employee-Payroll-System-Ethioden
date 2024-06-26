import { useFormik } from "formik";
import { useAllowance } from "../../../hooks/allowance-hook";
import { useAppDispatch, useAppSelector } from "../../../utils/custom-hook";
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
} from "../add-allowance/add-allowance.style";
import { Title } from "../add_employee/add-employee.style";
import { useEffect } from "react";
import { listAllowancesRequested } from "../../../store/allowance/allowance-slice";
import { ADD_ALLOWANCE, ADD_ALLOWANCE_TO_EMP } from "../../../constants/tasks";
import { addEmpAllowanceRequested } from "../../../store/employee/employee-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useModal } from "../../../hooks/modal-hook";
export const AddAllowanceToEmp = () => {
  const { allowances, curr_allowance } = useAllowance();
  const dispatcher = useAppDispatch();
  const employee = useAppSelector((state) => state.employee);
  const { openModal } = useModal();
  useEffect(() => {
    if (curr_allowance) {
      dispatcher(listAllowancesRequested());
    }
  }, [curr_allowance, dispatcher]);
  const { errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      allowance_type: "",
      employee_id: employee.curr_emp?.id || "",
    },
    onSubmit: (values) => {
      dispatcher(addEmpAllowanceRequested(values));
    },
  });

  return (
    <Modal content={ADD_ALLOWANCE_TO_EMP}>
      <AllowanceContainer>
        <AllowanceBody>
          <Title>Adding Allowance to {employee.curr_emp?.first_name}</Title>
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
                    openModal(ADD_ALLOWANCE);
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
            {employee.adding_emp_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {" "}
                {employee.adding_emp_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {" "}
              {employee.editing && !employee.adding_emp_error ? (
                <SmallSpinner />
              ) : (
                "Add"
              )}{" "}
            </AddBtn>
          </AllowanceForm>
        </AllowanceBody>
      </AllowanceContainer>
    </Modal>
  );
};
