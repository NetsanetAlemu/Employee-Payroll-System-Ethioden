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
  resetEmployeeState,
} from "../../../store/employee/employee-slice";
import { SmallSpinner } from "../../utils/spinner/spinner";
import { useSalary } from "../../../hooks/salary-hook";
import { useEmployee } from "../../../hooks/employee-hook";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { AddAllowanceToEmpSchema } from "../../../schema/add-allowance-schema";
import api from "../../../config/api";
import { Allowance } from "../../../typo/allowance/response";
/**
 * Renders a modal for adding an allowance to an employee.
 *
 * @returns JSX element representing the modal for adding an allowance to an employee.
 */
interface AllowancesLoader {
  allowances: Allowance[];
}
export const AddAllowanceToEmp = () => {
  //geting necessary data form the context , routers and the redux store
  const { curr_allowance } = useAllowance();
  const { allowances } = useLoaderData() as AllowancesLoader;
  const dispatcher = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { year, month, employee_id } = useParams();
  const { curr_emp } = useSalary();
  const employee = useEmployee();

  /**
   * This effect hook listens for changes in the `curr_allowance` state.
   * If `curr_allowance` is not null, it dispatches an action to fetch allowances from the backend.
   *
   * @param {AllowanceState} curr_allowance - The current allowance state.
   * @param {import('react').Dispatch<import('../../../store/allowance/allowance-slice').AllowanceAction>} dispatcher - The Redux dispatch function.
   *
   * @returns {void}
   */

  /**
   * This effect hook listens for changes in the `curr_allowance` state.
   * If `curr_allowance` is not null, it dispatches an action to fetch allowances from the backend.
   *
   * @param {AllowanceState} curr_allowance - The current allowance state.
   * @param {import('react').Dispatch<import('../../../store/allowance/allowance-slice').AllowanceAction>} dispatcher - The Redux dispatch function.
   *
   * @returns {void}
   */
  useEffect(() => {
    allowances.length == 0 && dispatcher(listAllowancesRequested());
  }, []);

  /**
   * Initializes the Formik instance for the AddAllowanceToEmp component.
   *
   * @returns An object containing the Formik instance properties: errors, touched, handleChange, handleSubmit, and values.
   */
  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    values,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      allowance_type: curr_allowance?.allowance_type || "",
      employee_id: employee_id || "",
      query_string: `?year=${year}&month=${month}`,
    },
    validationSchema: AddAllowanceToEmpSchema,
    onSubmit: (values) => {
      dispatcher(
        resetEmployeeState({
          ...employee,
          task_error: undefined,
        })
      );
      dispatcher(addEmpAllowanceRequested(values));
      navigate(-1);
    },
  });

  useEffect(() => {
    if (!employee.adding && isSubmitting) {
      resetForm({
        values: {
          allowance_type: "",
          employee_id: employee_id || "",
          query_string: `?year=${year}&month=${month}`,
        },
      });
      navigate(pathname.slice(0, pathname.lastIndexOf("/") + 1));
      clearTask();
      // alert(pathname.slice(0, pathname.lastIndexOf("/") + 1));
    }
  }, []);

  //Adding a method to close modal  properly
  /**
   * This function is used to clear the task and close the modal.
   * It dispatches an action to close the employee task.
   *
   *
   * @returns {void} - This function does not return any value.
   */
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
                  value={values.allowance_type}
                >
                  <SelectOption value="" disabled>
                    Select Allowance
                  </SelectOption>
                  {allowances.map(
                    (allowance) =>
                      allowance && (
                        <SelectOption
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
            {employee.task_error && (
              <FormError
                style={{
                  fontSize: "1.5rem",
                }}
              >
                {" "}
                {employee.task_error}
              </FormError>
            )}
            <AddBtn type="submit">
              {!employee.task_finished && !employee.task_error ? (
                <SmallSpinner />
              ) : (
                "Add"
              )}
            </AddBtn>
          </AllowanceForm>
        </AllowanceBody>
      </AllowanceContainer>
    </Modal>
  );
};

export const loader = async () => {
  const allowances = await api
    .get("/allowance/list?is_active=True")
    .then((response) => {
      return response.data;
    });

  return { allowances };
};