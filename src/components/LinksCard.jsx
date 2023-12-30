import React from 'react'
import Button from 'react-bootstrap/Button';
function LinksCard(props) {
  const link = `https://ilinkshort.vercel.app/go/${props.shortedUrl}`;
  const originalUrl = props.originalUrl;
  const handelSubmit = () => {
    const isAbsoluteURL = (originalUrl) => originalUrl.startsWith('http://') || originalUrl.startsWith('https://');
    const absoluteLink = isAbsoluteURL(originalUrl) ? originalUrl : `https://${originalUrl}`;
    try{
      window.location.assign(absoluteLink);
    }
    catch(error){
      alert("Invalid Original Url");
    }
  }
  return (
    <div className='text-center link-card-center'>
      <div className='my-3 mx-3 responsive-link-card' >
        <div className='text-center responsive-link-text' >
          <a href={link}>{link}</a>
        </div>
        <div className='google-fonts-poopins ms-3'><span>Clicks:- </span>{props.clicks}</div>

        <Button onClick={handelSubmit} variant="info" className='mx-3 mb-3 google-fonts-poopins' style={{ fontWeight: 'bold' }}>Original Url</Button>{' '}

      </div>
    </div>
  )
}

export default LinksCard
