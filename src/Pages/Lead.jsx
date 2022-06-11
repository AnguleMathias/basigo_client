import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Image, Text, Grid } from "@chakra-ui/core";
import { FaMapMarkerAlt } from "react-icons/fa";

import { getLeadById, reset } from "../features/leads/getLeadByIdSlice";
import Spinner from "../components/Spinner";
import CustomerCard from "../components/Card/CustomerCard";

const LeadView = () => {
  const { id } = useParams();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const leads = useSelector((state) => state.getLeadById);
  // console.log(leads);

  // useEffect(() => {
  //   if (!leads) {
  //     navigate("/");
  //   }

  //   dispatch(getLeadById(id));

  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [leads, dispatch, navigate]);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <Flex mb={8} pb={5} alignItems="center" borderBottom="2px solid #e6e6e6">
        <Flex mt={5} width="30%" height="200px" position="relative">
          <Image width="80%" height="100%" src={""} />
        </Flex>
        <Flex flexDirection="column" ml={8} justifySelf="start">
          <Flex>
            <Text fontSize="26px" fontWeight={600}>
              Name: name of lead here
            </Text>
          </Flex>
          <Flex>
            <Text mt={4} fontSize="18px">
              Location: location
            </Text>
          </Flex>

          <Flex>
            <Text mt={4} fontSize="18px">
              Start Date: Date created here
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
