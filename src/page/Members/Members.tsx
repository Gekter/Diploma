import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../../components/avatar/Avatar";
import HeaderPage from "../../components/headerPage/HeaderPage";
import { getMsg } from "../../global/msg";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProjectusers } from "../../store/userSlice/user.slice";
import MemberCard from "./MemberCard/MemberCard";

const Members = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const projectUsers = useAppSelector(state => state.users.projectUsers)
  console.log(projectUsers)

  React.useEffect(() => {
    dispatch(fetchProjectusers(+id!));
  }, []);
  return <div>

    <HeaderPage title={getMsg('membersSideMenuItem')}></HeaderPage>

    {
      projectUsers.map(user => (
        <MemberCard key={user.id} {...user}></MemberCard>
      ))
    }

  </div>;
};

export default Members;
