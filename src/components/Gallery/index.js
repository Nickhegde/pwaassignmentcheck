import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Gallery.css'

export default function Gallery({ closeGallery }) {
  const [gallery, setGallery] = useState([])

  useEffect(() => {
    axios.get('https://picsum.photos/v2/list')
      .then((response) => {
        setGallery(response.data);
      })
      .catch((error) => {
        caches.match('https://picsum.photos/v2/list')
          .then(function (result) {
            result.json()
              .then(function (json) {
                setGallery(json);
              })
          }
          )
      })
  }, [])

  return (
    <div className='gallery-container'>
      <button className='back-btn' onClick={() => { closeGallery(false) }}>Back</button>
      <div className='photo-container'>
        {
          gallery.map((photo, index) => {
            return (
              <img className='photo' key={index} src={`https://picsum.photos/id/${photo.id}/400/300`} alt={photo.author}></img>
            )
          })
        }</div>
    </div>
  );
}
