import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Image, Text, Grid } from "@chakra-ui/core";

import {
  getCustomers,
  reset as resetCustomersAction,
} from "../features/customers/getAllCustomersSlice";

import {
  getLeads,
  reset as resetLeads,
} from "../features/leads/getAllLeadsSlice";
import Spinner from "../components/Spinner";
import CustomerCard from "../components/Card/CustomerCard";

const LeadView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.login);

  const { leads, isLoading } = useSelector((state) => state.leads);
  const { customers, isLoading: customersLoading } = useSelector(
    (state) => state.customers
  );

  console.log("customers", customers);

  let lead = [];

  if (leads.length > 0) {
    lead = leads[0].filter((lead) => lead.id === Number(id));
  }

  const leadData = lead[0];

  useEffect(() => {
    if (!user) {
      navigate("/leads");
    }

    dispatch(getLeads());
    dispatch(getCustomers());

    return () => {
      dispatch(resetLeads());
    };
  }, [id, dispatch, user, navigate]);

  if (isLoading || customersLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Flex mb={8} pb={5} alignItems="center" borderBottom="2px solid #e6e6e6">
        <Flex mt={5} width="30%" height="200px" position="relative">
          <Image width="80%" height="100%" src={""} />
        </Flex>
        <Flex flexDirection="column" ml={8} justifySelf="start">
          <Flex>
            <Text fontSize="26px" fontWeight={600}>
              Name: {leadData && leadData.firstName}{" "}
              {leadData && leadData.middleName} {leadData && leadData.lastName}
            </Text>
          </Flex>
          <Flex>
            <Text mt={4} fontSize="18px">
              Location: {leadData && leadData.location}
            </Text>
          </Flex>
          <Flex>
            <Text mt={4} fontSize="18px">
              Start Date:{" "}
              {new Date(leadData && leadData.createdAt).toLocaleDateString()}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex mt={8} flexDirection="column">
        <h3>Customers</h3>
        <Grid
          gridTemplateColumns="repeat(2, 1fr)"
          gap="10px"
          width="90%"
          pt={5}
        >
          <CustomerCard />
          <CustomerCard />
          <CustomerCard />
          <CustomerCard />
          <CustomerCard />
        </Grid>
      </Flex>
    </>
  );
};

export default LeadView;
