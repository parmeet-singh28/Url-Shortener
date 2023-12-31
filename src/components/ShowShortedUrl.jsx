import React from 'react'

function ShowShortedUrl({ url , backgroundCol}) {
    const link = `https://ilinkshort.vercel.app/go/${url}`;
    const handelClick = () => {
        window.open(link, '_blank');
      }
    return (
        <div>
            {url ? (
                <div className='intro-header google-fonts-poopins mt-3 home-page-shortUrl' style={{backgroundColor:backgroundCol}} >
                    <div className='home-page-shortUrl-title'>Shorted Url:-</div>
                    <a style={{textDecoration:'none'}} href={link} target='_blank' rel="noopener noreferrer" >ilinkshort.vercel.app/go/{url}</a>
                </div>
            ) : (null)}
        </div>
    )
}

export default ShowShortedUrl
