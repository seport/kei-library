import { mdiHanger, mdiHeart, mdiHeartOutline, mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { Item } from "../graphql/generated/graphql";

const ItemCard = ({item}: PropTypes) => <div className="tile is-2 m-3"><div className="card is-flex-grow-1" onClick={() => window.location.assign(`/item/${item.id}`)}>
  <div className="card-image">
    <figure className="image">
      {item.image && item.image.length && <img src={`data:image/png;base64,${item.image && item.image[0].data}`} alt="Placeholder image" /> }
    </figure>
  </div>
  <div className="card-content is-flex-grow-1	">
    <p className="title is-6">{item.name}</p>
    <p className="subtitle is-6">{item.itemNumber}</p>
  </div>
  <footer className="card-footer">
    <a href="#" className="card-footer-item">
    <span className="icon is-small">

      <Icon path={mdiHeartOutline} /></span>
    </a>
    <a href="#" className="card-footer-item">
    <span className="icon is-small">

      <Icon path={item.userClosets && item.userClosets.length > 0 ? mdiTrashCan : mdiHanger} /></span>
    </a>
  </footer>
</div>
</div>

type PropTypes = {
  item: Item,
}

export default ItemCard;