import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getLeads, reset } from "../features/leads/getAllLeadsSlice";
import LeadForm from "../components/LeadForm";
import LeadItem from "../components/LeadItem";
import Spinner from "../components/Spinner";
import ModalWrap from "../components/ModalWrap";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.login);
  const { leads, isLoading, isError, message } = useSelector(
    (state) => state.leads
  );

  const handleAddLeadButton = () => {
    setIsModalOpen(true);
  };

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
        <p>
          <span>Leads Dashboard</span>
          <span>
            <button className="btn" onClick={handleAddLeadButton}>Create Lead</button>
          </span>
        </p>
      </section>
      <ModalWrap
        title="Create Lead"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <LeadForm user={user?.user?.email} />
      </ModalWrap>
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
