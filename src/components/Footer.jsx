import React from 'react'

function Footer() {
  return (
    <div style={{ backgroundColor: '#284243', height: '85px', display: 'flex', alignItems: 'center' }} className='mt-4' defaultActiveKey="/home" as="ul">
      <div className='google-fonts-ubuntu mt-2 text-center' style={{ fontSize: '17px', fontWeight: '-moz-initial', color: 'white', width: "98vw" }}>
        <a href='/terms' className='mx-3 remove-underline' >Terms & Conditions</a>
        <a href='/privacy' className='mx-3 remove-underline'>Privacy Policy</a>
        <a href='/about' className='mx-3 remove-underline'>About Us</a>
        <a href="/contact" className='mx-3 remove-underline'>Contact Us</a>
      </div>
    </div>
  )
}

export default Footer
