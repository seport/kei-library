import React, { useEffect, useState } from "react";
import MyPageLayout from "../../components/MyPageLayout";
import { useSession } from 'next-auth/client'
import { useQuery, gql } from "@apollo/client";
import Unauthorized from "../Unauthorized";
import Loading from "../../components/Loading";

const Settings = () => {
  const [session, sessionLoading] = useSession();
  if(sessionLoading) { return <Loading /> }
  if(!session) { return <Unauthorized /> }
  
  const USER_QUERY = gql`
  query UserDetails($id: ID!){
    user(id: $id) {
      name
      email
    }
  }
  `
  const { data, loading, error } = useQuery(USER_QUERY, {variables: {id: session.accountId}});

  useEffect(() => {
    setName(data?.user?.name)
    setEmail(data?.user?.email)
  }, [data])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  return <MyPageLayout active="settings">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input" value={name} disabled/>
        </div>
      </div> 
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input" value={email} disabled />
        </div>
      </div> 
    </MyPageLayout>
}

export default Settings;