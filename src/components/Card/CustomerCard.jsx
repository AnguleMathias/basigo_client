import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { Flex, Image, IconButton, Text } from "@chakra-ui/core";

import {
  deleteCustomer,
  reset,
} from "../../features/customers/deleteCustomerSlice";
import Card from "./Card";

const CustomerCard = ({ lead, customer }) => {
  console.log(lead);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await dispatch(deleteCustomer(customer.id));
    window.location.reload();
  };

  const handleNavigateToCustomer = () => {
    navigate(`/customer/${customer.id}`);
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [dispatch]);

  return (
    <Flex
      width="320px"
      alignItems="center"
      position="relative"
      className="user-card"
    >
      <Card
        m={2}
        width="100%"
        height="150px"
        flexDirection="row"
        cursor="pointer"
      >
        <Flex
          width="160px"
          position="relative"
          onClick={handleNavigateToCustomer}
        >
          <Image
            style={{ objectFit: "cover" }}
            width="100%"
            height="100%"
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          />
        </Flex>
        <Flex
          onClick={handleNavigateToCustomer}
          paddingLeft={2}
          width="60%"
          bg="white"
          height="100%"
          flexDirection="column"
          justifyContent="center"
          textAlign="left"
        >
          <Text my={2} fontSize="14px" fontWeight={600}>
            Name: {customer && customer.firstName}{" "}
            {customer && customer.middleName} {customer && customer.lastName}
          </Text>
          <Text fontSize="12px" maxHeight="60%" overflow="hidden">
            <b>Location: </b>
            {customer && customer.location}
          </Text>
          <Text fontSize="12px" mt={4}>
            <b>Tel: </b>
            {customer && customer.phone}
          </Text>
        </Flex>
        <IconButton
          aria-label="Delete Lead"
          backgroundColor="transparent"
          border="none"
          cursor="pointer"
          icon={FaTrash}
          onClick={handleDelete}
          _focus="none"
        />
      </Card>
    </Flex>
  );
};

export default CustomerCard;
