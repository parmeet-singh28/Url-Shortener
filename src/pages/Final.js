import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';
import Spinnerr from '../components/Spinner';

function FinalPage() {
  const params = useParams();
  const id = params.id;
  const firebase = useFirebase();
  const func = async () => {
    await firebase.getUrl(id).then(url => {
      const isAbsoluteURL = (url) => url.startsWith('http://') || url.startsWith('https://');
      const absoluteLink = isAbsoluteURL(url) ? url : `https://${url}`;
      try{
        window.location.assign(absoluteLink);
      }
      catch (error) {
        alert("This is not a valid url")
      }
    });
  }
  useEffect(() => {
    func();
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 85px - 85px)' }}>
      <h2 >Redirecting....</h2>
      <Spinnerr />
    </div>
  )
}

export default FinalPage

