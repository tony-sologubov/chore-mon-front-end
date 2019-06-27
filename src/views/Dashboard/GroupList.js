import React from "react";
import ComplexButton from "../../components/ComplexButton";
import { Link } from "react-router-dom";

const GroupList = props => {
  return props.groups.map(g => {
    return (
      <Link to={{ pathname: `groups/g.id` }}>
        <ComplexButton groupName={g.name} />
      </Link>
    );
  });
};

export default GroupList;
