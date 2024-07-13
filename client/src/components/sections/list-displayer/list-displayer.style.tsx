import styled from "styled-components";
import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

export const ListContainer = styled.div<ThemeProps>`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0 2rem;
`;
export const ListBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  position: relative;
`;
export const ListHeader = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.table.header};
  background-color: #d1d0d0;
  color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 2.5fr 2fr 2fr 3fr 1.5fr 1fr 3fr;
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary};
`;

export const ListTitle = styled.p<ThemeProps>`
  padding: 1rem 0;
  font-size: 1.4rem;
  letter-spacing: 2px;
`;

export const HeaderItem = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const ListRow = styled.div<ThemeProps>`
  background-color: ${({ theme }) => theme.backgrounds.primary};
  font-size: larger;
  padding: 0 0.5rem;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 2.5fr 2fr 2fr 3fr 1.5fr 1fr;
  justify-content: center;
  align-items: center;
  border: 2px solid #3434342b;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  cursor: pointer;
  /* background-color: ${({ theme }) =>
    addOpacityToColor(0.4, theme.table.tableRow)};
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.backgrounds.primary};
  } */

  &:hover {
    background-color: ${({ theme }) => theme.table.tableRowHover};
  }
  /* &:last-child {
    border-bottom: 0.2rem solid ${({ theme }) => theme.colors.primary};
  } */
`;

export const Data = styled.div<ThemeProps>`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  text-align: left;
  /* width: auto; */
`;

export const SortBtn = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.6rem;
  text-align: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.backgrounds.primary};
  }
`;

export const RowTemplate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

export const ColumnTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
`;

export const ViewBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: #0033ff;
  text-decoration: underline;
  gap: 0;
  &:hover {
    background-color: ${({ theme }) => theme.buttons.primary};
  }
`;