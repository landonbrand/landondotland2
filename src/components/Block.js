import React from 'react';

const Block = (props) => {
  return <a className="block-anchor" href={`/tune/${props.Name}`}>
    <div className="block-div" key={props.Name}>
      <img src={props.Image} className="block-image" />
      <div className="inner-block">
        <b>{props.Name}</b>
        <p>{props.Artist}</p>
        <p className="faded">{props.Format}</p>
      </div>
    </div>
  </a>
}

export default Block;