import React from "react";
import ComplexButton from "../../components/ComplexButton";
import { Link, withRouter } from "react-router-dom";

const GroupList = ({ groups }) => {
  if (!groups.length) {
    return (
      <div className="n-g-list">
        <h2 className="ff">
          You know what you should do? Eat a banana. But then you should
          probably make a list!
        </h2>
        {/* <img
          src={require("../../assets/bananas/arrow.png")}
          alt="whatever"
          className="arrow"
        /> */}
      </div>
    );
  } else {
    return groups.map(g => {
      return (
        <Link
          key={g.id}
          to={{
            pathname: `groups/${g.groupId}`,
            state: { groupId: `${g.groupId}` }
          }}
        >
          <ComplexButton groupName={g.name} />
        </Link>
      );
    });
  }
};

export default withRouter(GroupList);
