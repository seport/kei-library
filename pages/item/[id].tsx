import React from "react";
import { useRouter } from 'next/router'
import { useQuery, useMutation, gql } from "@apollo/client";
import Loading from "../../components/Loading";
import { useSession } from 'next-auth/client'
import Icon from '@mdi/react'
import { mdiHeartOutline, mdiHanger, mdiHeart, mdiTrashCan } from '@mdi/js'

const Item = () => {
  const router = useRouter()
  const { id } = router.query

  const [session, sessionLoading] = useSession();

  const ITEM_QUERY = gql`
  query ItemDetails($id: ID!){
    item(id: $id) {
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

  const ADD_TO_CLOSET_MUTATION = gql`
  mutation AddItemToCloset($id: ID!){
    addItemToCloset(itemId: $id) {
      id
      name
      itemNumber
    }
  }
  `

  const REMOVE_FROM_CLOSET = gql`
  mutation RemoveItemFromCloset($id: ID!){
    removeItemFromCloset(itemId: $id) {
      id
      name
      itemNumber
    }
  }
  `

  const { data, loading, error } = useQuery(ITEM_QUERY, {
    variables: {
      id: id
    }
  });

  const [addItemToCloset, addItemToClosetMutation] = useMutation(ADD_TO_CLOSET_MUTATION, {variables: { id: id}, refetchQueries: [ITEM_QUERY]});
  const [removeItemFromCloset, removeItemFromClosetMutation] = useMutation(REMOVE_FROM_CLOSET,{variables: { id: id}, refetchQueries: [ITEM_QUERY]})

  if(loading) { return <Loading />}
  if(!data) { return <div>{error?.message}</div> }

  return <div>
    <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
  <ul>
    <li><a href="/">My Kei Collection</a></li>
    <li className="is-active"><a href="">{data.item.name}</a></li>
  </ul>
</nav>
    <div className="columns">
      <div className="column">
      <figure className="image is-500x1280">
      {data.item.image && data.item.image.length && <img src={`data:image/png;base64,${data.item.image && data.item.image[0].data}`} alt="Placeholder image" /> }
      </figure>
      </div>
      <div className="column">
        <div className="block">
          <h1 className="title is-4">Name</h1>
          <h2 className="subtitle is-6">{data.item.name}</h2>
        </div>
        <div className="block">
          <h1 className="title is-4">Item Number</h1>
          <h2 className="subtitle is-6">{data.item.itemNumber}</h2>
        </div>
        <div className="block">
          <h1 className="title is-4">Price</h1>
          <h2 className="subtitle is-6">JP¥{data.item.price}</h2>
        </div>
        <div className="block">
          <h1 className="title is-4">Description</h1>
          <h2 className="subtitle is-6">{data.item.description}</h2>
        </div>
        <div className="block">
          <h1 className="title is-4">Material</h1>
          <h2 className="subtitle is-6">{data.item.material}</h2>
        </div>
        <div className="block">
          <h1 className="title is-4">Measurements</h1>
          <h2 className="subtitle is-6">{data.item.measurements}</h2>
        </div>
      {session && <div className="buttons">
      <button className="button is-white">
          <span className="icon is-small">
            <Icon path={mdiHeartOutline} />
          </span>
        </button>
        <button className="button is-white" onClick={() => {data.item.userClosets.length > 0 ? removeItemFromCloset() : addItemToCloset()}}>
          <span className="icon is-small">
            <Icon path={data.item.userClosets.length > 0 ? mdiTrashCan : mdiHanger} />
          </span>
        </button>
        </div>}
      </div>
    </div>
  </div>
}

export default Item;