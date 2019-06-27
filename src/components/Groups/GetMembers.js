import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase/index";
import MemberCard from "./MemberCard";
import uuidv4 from "uuid";

const GetMembers = () => {
  const { firebase } = useContext(FirebaseContext);
  const [members, setMembers] = useState([]);
  const id = JSON.parse(localStorage.getItem("user")).uid;
  useEffect(() => {
    const unsubscribe = firebase.firestore
      .collection(`users/${id}/groups/${id}/groupmembers`)
      .onSnapshot(snapshot =>
        setMembers(
          snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
          })
        )
      );
    return () => {
      unsubscribe();
    };
  }, [firebase.firestore, id]);

  return members.map(member => (
    <MemberCard key={uuidv4()} email={member.email} id={member.id} />
  ));
};

export default GetMembers;
