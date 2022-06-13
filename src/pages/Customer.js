import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Image, Text } from "@chakra-ui/core";

import Spinner from "../components/Spinner";

const Customer = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.login);

  const { customers, isLoading } = useSelector((state) => state.customers);
  const { leads, isLoading: isLoadingLeads } = useSelector(
    (state) => state.leads
  );

  let customer = [];
  let lead = [];

  if (customers.length > 0) {
    customer = customers[0].filter((customer) => customer.id === Number(id));
  }

  const customerData = customer[0];

  if (leads.length > 0) {
    lead = leads[0].filter(
      (lead) => lead.id === (customerData && customerData.leadId)
    )[0];
  }

  console.log(lead);

  useEffect(() => {
    if (!user) {
      navigate("/leads");
    }
  }, [user, navigate]);

  if (isLoading || isLoadingLeads) {
    return <Spinner />;
  }

  return (
    <Flex
      mb={8}
      pb={5}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      borderBottom="2px solid #e6e6e6"
    >
      <Flex mt={5} width="30%" height="200px" position="relative">
        <Image width="80%" height="100%" src={""} />
      </Flex>
      <Flex flexDirection="column" ml={8} justifySelf="start">
        <Flex>
          <Text fontSize="26px" fontWeight={600}>
            Name: {customerData && customerData.firstName}{" "}
            {customerData && customerData.middleName}{" "}
            {customerData && customerData.lastName}
          </Text>
        </Flex>
        <Flex>
          <Text mt={4} fontSize="18px">
            <b>Location:</b> {customerData && customerData.location}
          </Text>
        </Flex>
        <Flex>
          <Text mt={4} fontSize="18px">
            <b>Date registered: </b>
            {new Date(
              customerData && customerData.createdAt
            ).toLocaleDateString()}
          </Text>
        </Flex>
        <Flex>
          <Text mt={4} fontSize="18px">
            <b>Mobile no:</b> {customerData && customerData.phone}
          </Text>
        </Flex>
        <Flex>
          <Text mt={4} fontSize="18px">
            <b>Gender:</b> {customerData && customerData.gender}
          </Text>
        </Flex>
        <Flex>
          <Text mt={4} fontSize="18px">
            <b>Annual earning:</b> {customerData && customerData.annualEarning}
          </Text>
        </Flex>
        <Flex>
          <Text mt={4} fontSize="18px">
            <b>Product of interest:</b>{" "}
            {customerData && customerData.productsOfInterest}
          </Text>
        </Flex>
        <Flex>
          <Text mt={4} fontSize="18px">
            <b>Lead:</b> {lead && lead.email}
            {" - "}
            {lead && lead.phone}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Customer;
