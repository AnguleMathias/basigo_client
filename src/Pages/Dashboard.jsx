import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getLeads, reset } from "../features/leads/getAllLeadsSlice";
import LeadForm from "../components/LeadForm";
import LeadItem from "../components/LeadItem";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.login);
  const { leads, isLoading, isError, message } = useSelector(
    (state) => state.leads
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getLeads());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Hello {user?.user?.username}</h1>
        <p>Leads Dashboard</p>
      </section>
      <LeadForm user={user?.user?.email} />
      <section className="content">
        {leads.length > 0 ? (
          <div className="leads">
            {leads[0].map((lead, index) => (
              <LeadItem key={`${lead.id}-${index}`} lead={lead} />
            ))}
          </div>
        ) : (
          <h3>No leads found</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
