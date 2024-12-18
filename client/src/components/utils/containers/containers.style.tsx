/* eslint-disable react-refresh/only-export-components */
import styled, { css } from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";
import { custom_vertical_scroll_bar } from "../scroll-bar/scroll-bar";

export const container_css = css`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 0rem 0rem 1rem ${({ theme }) => theme.colors.secondary};
  border-radius: 0.5rem;
  height: 100%;
  width: 100%;
  gap: 2rem;
`;

export const header_css = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1rem;
`;

export const title_css = css`
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
  letter-spacing: 0.1rem;
`;

export const btn_css = css`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.backgrounds.primary};
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background-color: ${({ theme }) => theme.buttons.primary};
  border: none;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.75, theme.buttons.primary)};
  }
`;

export const body_css = css`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.1rem;
  flex-direction: column;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.backgrounds.primary};
  ${custom_vertical_scroll_bar};
`;

export const NoResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  color: ${({ theme }) => addOpacityToColor(0.7, theme.colors.primary)};
  letter-spacing: 0.1rem;
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem;
`;
