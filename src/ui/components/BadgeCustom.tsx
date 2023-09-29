import styled from "styled-components";
import React from "react";

const BadgeStyled = styled.div<{
  background?: string;
  borderColor?: string;
  borderRadius?: string;
  color?: string;
  fontSize?: string;
  padding?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingBottom?: string;

  margin?: string;
}>`
  background-color: ${(props) => props.background || "gray"};
  border: 0px solid ${(props) => props.borderColor || "black"};
  border-radius: ${(props) => props.borderRadius || "4px"};
  color: ${(props) => props.color || "white"};
  font-size: ${(props) => props.fontSize || "16px"};
  padding: ${(props) => props.padding || "10px 10px 10px 10px"};
  margin: ${(props) => props.margin || "5px"};
  border-radius: ${(props) => props.borderRadius || "25px"};
  display: inline-block;
`;
const BadgeCustom: React.FC<{
  background?: string;
  borderColor?: string;
  borderRadius?: string;
  color?: string;
  fontSize?: string;
  padding?: string;
  margin?: string;

  children: React.ReactNode;
}> = ({
  background,
  borderColor,
  borderRadius,
  color,
  fontSize,
  padding,
  margin,
  children,
}) => {
  return (
    <BadgeStyled
      background={background}
      borderColor={borderColor}
      borderRadius={borderRadius}
      color={color}
      fontSize={fontSize}
      padding={padding}
      margin={margin}
    >
      {children}
    </BadgeStyled>
  );
};

export default BadgeCustom;
