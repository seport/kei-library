import React from "react";
import MyPageLayout from "../../components/MyPageLayout";
import { useQuery, gql } from "@apollo/client";
import ItemCard from "../../components/ItemCard";
import { Item } from "../../graphql/generated/graphql";
import Loading from "../../components/Loading";
import Unauthorized from "../Unauthorized";
import { useSession } from "next-auth/client";

const ITEM_QUERY = gql`
query ItemDetails{
  closetItems {
    id
    name
    itemNumber
    description
    price
    material
    measurements
    userClosets {
      id
    }
    image {
      data
    }
  }
}
`


const Closet = () => {
  const [session, sessionLoading] = useSession();
  if(sessionLoading) { return <Loading /> }
  if(!session) { return <Unauthorized /> }

  const { data, loading, error } = useQuery(ITEM_QUERY);

  if(loading) { return <Loading />}
  if(!loading && data.closetItems.length < 1) { return <MyPageLayout active="closet">No items in closet.</MyPageLayout>}
  return <MyPageLayout active="closet">
      <div className="tile is-ancestor is-flex-wrap-wrap">
      {data.closetItems.map((item: Item) => <ItemCard key={item.id} item={item} />)}
      </div>
    </MyPageLayout>
}

export default Closet;