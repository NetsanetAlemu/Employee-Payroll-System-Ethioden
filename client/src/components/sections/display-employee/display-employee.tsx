import { setTask } from "../../../store/employee/employee-slice";
import { ADD_EMP } from "../../../utils/constants/tasks";
import { useAppDispatch } from "../../../utils/custom-hook";
import { Search } from "../../utils/search/search";
import { AddButton, Body, Header, Title } from "./display-employee.style";
import Table from "../list-displayer/list-displayer";
import { EmployeeDisplayerContainer } from "./display-employee.style";

export const DisplayEmployee = () => {
  const dispatcher = useAppDispatch();
  return (
    <EmployeeDisplayerContainer>
      <Header>
        <Title>All Employees</Title>
        <AddButton onClick={() => dispatcher(setTask(ADD_EMP))}>Add</AddButton>
      </Header>
      <Search />
      <Body>
        <Table />
      </Body>
    </EmployeeDisplayerContainer>
  );
};
