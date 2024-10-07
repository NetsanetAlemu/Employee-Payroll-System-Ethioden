import styled, { css } from "styled-components";
import { FcHome } from "react-icons/fc";
import { HiUserCircle } from "react-icons/hi";

import { ThemeProps } from "../../../typo/theme/theme";
import { addOpacityToColor } from "../../utils/convertor/add-opacity-color";
import { LuCircleDollarSign } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { CloseIcon } from "../../utils/flash-message/flash-message.style";
import { Theme } from "../../../theme/theme";

export const LeftMenuContainer = styled.div<ThemeProps>`
  width: 16vw;
  height: 100vh;
  background-color: ${({ theme }) =>
    addOpacityToColor(0.9, theme.backgrounds.primary)};
  display: flex;
  z-index: 100;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.secondary};
  border-right: 0.3rem solid ${({ theme }) => theme.colors.secondary};
  position: relative;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* gap: 1rem; */
  font-size: 3.5rem;
  font-weight: 700;
  width: 100%;
  height: 25%;
  letter-spacing: 0.1rem;
  margin: 0;
  padding: 0;
`;

export const LogoImage = styled.img`
  width: 50%;
  height: 50%;
  border-radius: 50%;
`;

interface MenuItemProps {
  is_active: boolean;
  theme: Theme;
}

export const MenuItem = styled.div<MenuItemProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90%;
  padding: 0.5rem 2rem;
  text-align: left;
  font-size: 2rem;
  margin: 0.3rem 1rem;
  gap: 1rem;
  border-radius: 0.5rem;
  color: ${({ is_active, theme }) =>
    is_active ? theme.backgrounds.primary : theme.colors.primary};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) =>
      addOpacityToColor(0.76, theme.buttons.primary)};
    color: ${({ theme }) => theme.backgrounds.primary};
  }
  border-bottom: 0.4rem solid transparent;
  background-color: ${({ is_active, theme }) =>
    is_active ? theme.buttons.primary : "transparent"};
  position: relative;
`;

export const SubMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  width: 90%;
  margin: 1rem;
  margin-left: 4rem;
  border-radius: 0.5rem;
  transition: all 0.5s ease;
  border-left: 0.2rem solid
    ${({ theme }) => addOpacityToColor(0.7, theme.buttons.primary)};
`;

interface SubMenuItemProps extends ThemeProps {
  active: boolean;
}

export const SubMenuItem = styled.div<SubMenuItemProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  padding: 0.5rem 1rem;
  text-align: left;
  font-size: 1.6rem;
  color: ${({ active, theme }) =>
    active ? theme.buttons.primary : theme.colors.primary};

  background-color: ${({ active, theme }) =>
    active ? addOpacityToColor(0.1, theme.buttons.primary) : "transparent"};

  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    color: ${({ theme }) => theme.buttons.primary};
    background-color: ${({ theme }) =>
      addOpacityToColor(0.1, theme.buttons.primary)};
  }
`;
export const MenuItemText = styled.h1`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 0.8;
  padding: 0.5rem 0;
  letter-spacing: 0.1rem;
`;

export const Icon = css`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

export const HomeIcon = styled(FcHome)`
  ${Icon}
`;

export const UsersIcon = styled(PiUsersThree)`
  ${Icon}
`;

export const UserIcon = styled(HiUserCircle)`
  ${Icon}
`;

export const SalaryIcon = styled(LuCircleDollarSign)`
  ${Icon}
`;
export const Close = styled(CloseIcon)`
  ${Icon}
  position: absolute;
  top: 0.51rem;
  right: 0.5rem;
  display: none;
`;

export const ColapseExpand = styled.div`
  display: flex;
  justify-self: flex-end;
  position: absolute;
  right: 0.5rem;
`;
