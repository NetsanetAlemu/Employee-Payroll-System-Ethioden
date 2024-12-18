import styled from "styled-components";
import { addOpacityToColor } from "../convertor/add-opacity-color";

export const BlurredText = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
  letter-spacing: 0.1rem;
`;

export const LargeBlurredText = styled(BlurredText);

export const MidBlurredText = styled(BlurredText)`
  font-size: 1.4rem;
`;

export const NormalBlurredText = styled.h1`
  font-size: 1.2rem;
  letter-spacing: 0.1rem;

`;

export const SmallBlurredText = styled.h1`
  font-size: 1rem;
  color: ${({ theme }) => addOpacityToColor(0.6, theme.colors.primary)};
  letter-spacing: 0.1rem;
`;

export const LargeText = styled(BlurredText)`
  color: ${({ theme }) => addOpacityToColor(0.8, theme.colors.primary)};
`;
