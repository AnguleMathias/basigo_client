import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Image, Text, Grid } from "@chakra-ui/core";
import { FaMapMarkerAlt } from "react-icons/fa";

import { getLeadById, reset } from "../features/leads/getLeadByIdSlice";
import Spinner from "../components/Spinner";
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
    <Flex mb={3} pb={3} alignItems="center" borderBottom="2px solid #e6e6e6">
      <Flex m={5} width="30%" height="200px" position="relative">
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
  );
};

export default LeadView;
