import { useDispatch } from "react-redux";
import { deleteLead } from "../features/leads/deleteLeadSlice";

const LeadItem = ({ lead }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteLead(lead.id));
    window.location.reload();
  };

  return (
    <div className="lead">
      <h2>{`${lead.firstName} ${lead.middleName} ${lead.lastName}`}</h2>
      <p>{lead.phone}</p>
      {/* <div>{new Date(lead.createdAt).toLocaleDateString("en-US")}</div> */}
      <button onClick={handleDelete} className="close">
        X
      </button>
    </div>
  );
};

export default LeadItem;
