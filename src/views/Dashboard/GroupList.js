import React from "react";
import ComplexButton from "../../components/ComplexButton";
import { Link } from "react-router-dom";

const GroupList = ({ groups }) => {
  if (!groups.length) {
    return <h2>No Groups</h2>;
  } else {
    return groups.map(g => {
      return (
        <Link key={g.id} to={{ pathname: `groups/${g.groupId}` }}>
          <ComplexButton groupName={g.name} />
        </Link>
      );
    });
  }
};

export default GroupList;
