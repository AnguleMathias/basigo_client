import * as React from "react";
import { IconButton, Modal, ModalContent, ModalOverlay } from "@chakra-ui/core";
import { IoMdClose } from "react-icons/io";

import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";

const ModalWrap = ({ children, title, onClose, isOpen, ...rest }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent shadow="none" bg="transparent" rounded="md">
        <Card
          rounded="md"
          shadow="md"
          m={4}
          overflow="auto"
          borderWidth={0}
          justifyContent="flex-start"
        >
          <CardHeader
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <h3 mb={0}>{title}</h3>
            <IconButton
              onClick={onClose}
              size="sm"
              aria-label="Close Modal"
              icon={IoMdClose}
            />
          </CardHeader>
          {children}
        </Card>
      </ModalContent>
    </Modal>
  );
};

export default ModalWrap;

ModalWrap.defaultProps = {
  title: "Modal Heading",
  size: "xl",
  scrollBehavior: "inside",
  isCentered: true,
  preserveScrollBarGap: true,
};
