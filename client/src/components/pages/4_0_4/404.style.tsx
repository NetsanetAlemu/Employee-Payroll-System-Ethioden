import styled from "styled-components";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";

// Styled components
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

export const StatusCode = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
`;

export const Message = styled.p`
  font-size: 1.5rem;
  margin: 20px 0;
`;

export const HomeLink = styled.a`
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
`;
