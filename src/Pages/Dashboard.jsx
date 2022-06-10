import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LeadForm from "../components/LeadForm";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className="heading">
        <h1>Hello {user?.user?.username}</h1>
        <p>Leads Dashboard</p>
      </section>
      <LeadForm user={user?.user?.email} />
    </>
  );
};

export default Dashboard;
