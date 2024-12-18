import styled, { css } from "styled-components";

export const container = css`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 0.5rem;
`;

export const body = css`
  width: 80vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const sub_header_css = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 1rem;
  margin: 0rem 2rem 0rem 1rem;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  padding: 1rem;
  padding-right: 2rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
`;
