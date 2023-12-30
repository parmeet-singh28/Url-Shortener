import React from 'react'

function ShowShortedUrl({ url , backgroundCol}) {
    const link = `www.tplink.vercel.com/tp/${url}`;
    const handelClick = () => {
        window.open(link, '_blank');
      }
    return (
        <div>
            {url ? (
                <div className='intro-header google-fonts-poopins mt-3 home-page-shortUrl' style={{backgroundColor:backgroundCol}} >
                    <div>Shorted Url:-</div>
                    <a style={{textDecoration:'none'}} href={link} target='_blank' rel="noopener noreferrer" >www.tplink.vercel.com/tp/{url}</a>
                </div>
            ) : (null)}
        </div>
    )
}

export default ShowShortedUrl
