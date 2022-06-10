const LeadItem = ({ lead }) => {
  return (
    <div className="lead">
      <h2>{`${lead.firstName} ${lead.middleName} ${lead.lastName}`}</h2>
      <div>{new Date(lead.createdAt).toLocaleDateString("en-US")}</div>
    </div>
  );
};

export default LeadItem;
