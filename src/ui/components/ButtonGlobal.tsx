// ButtonGlobal.tsx

import styled from "styled-components";

interface ButtonProps {
  bgColor?: string;
  color?: string;
  border?: string;
  hoverBgColor?: string;
  width?: string;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 4px 20px;

  border-radius: 28px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  width: ${(props) => props.width || "100%"};
  background-color: ${(props) => props.bgColor || "#6e0d2e"};
  color: ${(props) => props.color || "#fff"};
  border: ${(props) => props.border || "6px solid var(--border-buttons)"};
  &:disabled {
    background-color: grey;
    color: darkgrey;
    cursor: not-allowed;
  }
  &:hover {
    background-color: ${(props) =>
      props.hoverBgColor || `var(--color-primary)`};
  }
`;
const FloatingButton = styled(StyledButton)`
  position: fixed;
  bottom: 80px;
  right: 80px;
  z-index: 9999;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 16px;
  box-shadow: 6px 6px 5px rgba(0, 0, 0, 0.6);
`;

export const ButtonGlobal: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { bgColor, color, border, hoverBgColor, width, ...rest } = props;
  return <StyledButton {...rest}></StyledButton>;
};

export const FloatingButtonGlobal: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { bgColor, color, border, hoverBgColor, width, ...rest } = props;
  return <FloatingButton {...rest}></FloatingButton>;
};
