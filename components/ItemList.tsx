import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from 'next/router'
import { Item } from "../graphql/generated/graphql";
import ItemCard from "./ItemCard";
import Loading from "./Loading";
import Error from "./Error";
import Pagination from "./Pagination";

const ITEMS_QUERY = gql`
query ItemList($skip: Int, $take: Int, $search: String){
  itemList(skip: $skip, take: $take, search: $search) {
    results {
      id
      name
      itemNumber
      userClosets {
        id
      }
      image {
        data
      }
    }
    currentPage
    totalPages
    totalResults
  }
}
`

const ItemList = () => {
  const router = useRouter()
  const queries = router.query
  const page = queries.page || 1;
  const { data, loading, error } = useQuery(ITEMS_QUERY, {
    variables: {
      skip: ((page - 1) * 20), 
      take: 20,
      search: queries.search,
    }
  });

  if(loading) { return <Loading /> }
  if(error || !data) { return <Error error={error} /> }
  return <>
    <Pagination currentPage={data.itemList.currentPage} totalPages={data.itemList.totalPages} />
    <p className="block">Showing <strong>{data.itemList.results.length}</strong> results out of <strong>{data.itemList.totalResults}</strong>.</p>
    <div className="tile is-ancestor is-flex-wrap-wrap">
      {data.itemList.results.map((item: Item) => <ItemCard key={item.id} item={item} />)}
    </div>
    <Pagination currentPage={data.itemList.currentPage} totalPages={data.itemList.totalPages} />
  </>
}

export default ItemList;