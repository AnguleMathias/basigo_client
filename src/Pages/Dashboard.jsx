import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getLeads, reset } from "../features/leads/getAllLeadsSlice";
import LeadForm from "../components/LeadForm";
import ModalWrap from "../components/ModalWrap";
import Spinner from "../components/Spinner";
import UserCard from "../components/Card/LeadCard";

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
          <span>Leads</span>
          <span style={{ float: "right" }}>
            <button className="btn" onClick={handleAddLeadButton}>
              Create Lead
            </button>
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
              <UserCard key={lead.id} lead={lead} />
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
