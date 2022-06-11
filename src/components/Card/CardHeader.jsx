import * as React from "react";
import { Flex } from "@chakra-ui/core";

const CardHeader = ({ children, ...rest }) => {
  return (
    <Flex borderBottomWidth="1px" {...rest}>
      {children}
    </Flex>
  );
};

export default CardHeader;

CardHeader.defaultProps = {
  p: 4,
  roundedTopLeft: 4,
  roundedTopRight: 4,
  flexDir: "row",
};
