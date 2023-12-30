import React from 'react'
import { useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import clickLogo from '../assets/images/click_logo.jpeg'
import urlLogo from '../assets/images/short_link.png'
import Nav from 'react-bootstrap/Nav';
import SmallCard from '../components/SmallCard';
import ShowShortedUrl from '../components/ShowShortedUrl';
import Spinnerr from '../components/Spinner';
import FoldUnfold from '../components/FoldUnfold';
import SignupPage from './Signup';


function HomePage() {
  const [signin, setSignUp] = useState(false);
  const firebase = useFirebase();
  const [url, setUrl] = useState("");
  const [shortedUrl, setshortedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handelPutData = async (e) => {
    e.preventDefault();
    if (url == "") {
      alert("Please Enter a Url");
      return;
    }
    setLoading(true);
    const shorted = await firebase.putData(url)
    if (shorted != null) {
      setshortedUrl(shorted);
      setLoading(false);
    }
  }
  return (
    <>
      <div className='max-width horizontal-center'>
        <div className='col-flex' >
          <div className='text-overlay intro-header text-primary google-fonts-ubuntu'>
            Create Short URLs
          </div>
          <div className='text-overlay intro-next text-primary' style={{lineHeight:'35px'}}>
            iLinkShort is the World's Shortest Link Shortener service to track,
          </div>
          <div className='text-overlay intro-next text-primary'>
            brand, and share short URLs.
          </div>
          <Form noValidate onSubmit={handelPutData}>
            <InputGroup size="lg" className="mt-5 input-center" style={{boxShadow:'0 1px 2px #e9ecef'}}>
              <Form.Control className='input-cente' onChange={(e) => setUrl(e.target.value)} value={url}
                placeholder="Enter a link to Shorten it"
                aria-label="Enter a link to Shorten it"
                aria-describedby="basic-addon2"
                type="url"
                spellCheck="false"
                autoCapitalize='none'
                autoComplete='off'

              />
            </InputGroup>
          </Form>
          <Button onClick={handelPutData} style={{ fontSize: '19px', fontWeight: 'bold', }} className="mt-3 button-center box-shaddow" variant="warning" id="button-addon2">
            Shorten URL{' >'}
          </Button>
          <div className='row-flex center'>
            {loading ? (<Spinnerr />) : (null)}

          </div>
          <ShowShortedUrl url={shortedUrl} backgroundCol={'#f5f7f8'} />
        </div>
        <div className='col-flex my-3 box-shaddow' style={{ backgroundColor: '#f5f7f8' }}>
          <div className="col-flex my-3">
            <Image className="center mt-3" src={urlLogo} height={150} width={150} rounded />
            <div className='google-fonts-ubuntu mt-2 text-center' style={{ fontSize: '30px', fontWeight: 'initial', }}>
              A fast and simple URL shortener
            </div>
            <div className='my-3 text-center' style={{ fontSize: '19px', fontWeight: 'initial', }}>
              Free URL Shortener for transforming long, ugly links into nice, memorable and trackable short URLs. Use it to shorten links for any social media platforms, blogs, SMS, emails, ads, or pretty much anywhere else you want to share them. Twitter, Facebook, YouTube, Instagram, WhatsApp, emails, SMS, videos. ilinkshort.vercel.app is the best free alternative to generic URL shorteners like bitly and tinyurl. After shorterning the URL, check how many clicks it received.
            </div>
          </div>
          <div className='col-flex my-3'>
            <Image className="center mt-3" src={clickLogo} height={150} width={150} rounded />
            <div className='google-fonts-ubuntu mt-2 text-center' style={{ fontSize: '30px', fontWeight: 'initial', }}>
              Track Link Clicks
            </div>
            <div className='my-3 text-center' style={{ fontSize: '19px', fontWeight: 'initial', }}>
              With over 30,000,000 links shortened and tracked over 600,000,000 link clicks, iLinkShort lets you know where users are coming from and is a click counter tool to track link analytics.
            </div>
          </div>
        </div>
      </div>
      <Nav style={{ backgroundColor: '#284243' }} className='mt-4' defaultActiveKey="/home" as="ul">
        <Nav.Item>
          <div className='google-fonts-ubuntu mt-2 text-center' style={{ fontSize: '30px', fontWeight: '-moz-initial', color: 'white', width: "98vw" }}>
            Looking for <bold>MORE</bold> than a Free URL Shortener?
          </div>
          <div className='text-center'>
            <Button className="my-3 box-shaddow" variant="warning" id="button-addon2" onClick={() => setSignUp(true)}>
              Get Started{' >'}
            </Button>
            <SignupPage
              show={signin}
              onHide={() => setSignUp(false)}
            />
          </div>
        </Nav.Item>
      </Nav>

      <Nav style={{ backgroundColor: '#2281c2' }} className='my-5 col-flex' defaultActiveKey="/home" as="ul">
        <Nav.Item className='mt-3 mx-5'>
          <FoldUnfold title={'What is a URL shortener?'} text={`A URL shortener, or a link shortener, simplifies long and complicated URLs into brief, comprehensible links. The application of a URL shortener can notably elevate your digital marketing effortss. When you choose to shorten URL, you're making a complex web address more user-friendly and accessible.
For anyone producing or circulating content online, understanding how to shorten a URL is essential.
Enhance your online presence with our effortless and free URL shortening tool presented above.`} />
        </Nav.Item>
        <Nav.Item className='mx-5'><FoldUnfold title={'How do I change a long URL to a short URL?'} text={`To shorten a URL, you'll need a service like ilinkshort.vercel.app. First, copy the long URL you want to shorten. Then, access the URL shortener tool. Paste your long URL into the appropriate field, then click "Shorten URL." ilinkshort.vercel.app will instantly generate a shortened version of your original URL, which leads to the same page when clicked.`} /></Nav.Item>
        <Nav.Item className='mx-5' ><FoldUnfold title={'Which link shortener is best?'} text={`iLinkShort stands out as a top-rated URL shortener due to its dependability, security, and array of link management features. Beyond merely providing a way to shorten URL, iLinkShort also delivers performance tracking through click-through rates and the option to brand URLs. Explore iLinkShort's premium features to fully optimize your link management.`} /></Nav.Item>
        <Nav.Item className='mx-5' ><FoldUnfold title={'What are the benefits of a short URL?'} text={`When you choose to shorten a URL, you're optimizing your digital content in several ways. Short URLs are more manageable and tidy, fitting neatly into character-limited spaces like tweets or Instagram bios. They are also simpler to remember and type manually. Moreover, many URL shorteners include tracking capabilities, offering vital data on link engagement – a crucial tool for businesses and marketing campaigns. Finally, short URLs can be customized for increased brand recognition and user trust.`} /></Nav.Item>
        <Nav.Item className='mb-3 mx-5'><FoldUnfold title={'How do I shorten a URL for free?'} text={`You can shorten a URL for free using online services like ilinkshort.vercel.app. The process couldn't be simpler: access ilinkshort.vercel.app's URL shortener tool, insert your long URL into the specified field, then click to generate a shortened URL.`} /></Nav.Item>
      </Nav>




      <div className='col-flex center' style={{ flexWrap: 'wrap' }}>
        <div className='row-flex center my-3' style={{ flexWrap: 'wrap' }} >
          <SmallCard title="2 billion" text="Clicks tracked each month" />
          <SmallCard title="1 billion" text="Branded links created and counting" />
        </div>
        <div className='row-flex center mb-3' style={{ flexWrap: 'wrap' }}>
          <SmallCard title="1.3 million" text="Happy customers" />
          <SmallCard title="6 billion" text="Total Clicks" />
        </div>
      </div>
    </>
  );
}

export default HomePage