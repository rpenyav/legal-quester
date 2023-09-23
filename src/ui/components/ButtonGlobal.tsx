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

  &:hover {
    background-color: ${(props) =>
      props.hoverBgColor || `var(--color-primary)`};
  }
`;

export const ButtonGlobal: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  return <StyledButton {...props} />;
};
