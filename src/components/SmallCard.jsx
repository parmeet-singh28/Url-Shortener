import React from 'react'
function SmallCard(props) {
    return (
        <div style={{ backgroundColor: '#f5f7f8' }} className='mx-3 text-center max-width responsive-card'>
            <h1 style={{ fontSize: '30px' }} className='google-fonts-poopins my-3'>{props.title}</h1>
            <h2 style={{ fontSize: '20px' }} className='google-fonts-noto mt-3'>{props.text}</h2>
        </div>
    )
}

export default SmallCard
