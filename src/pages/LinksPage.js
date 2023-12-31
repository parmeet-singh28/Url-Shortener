import React, { useEffect, useState } from 'react'
import ShowShortedUrl from '../components/ShowShortedUrl'
import { Button } from 'react-bootstrap';
import Spinnerr from '../components/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import LinksCard from '../components/LinksCard';


function LinksPage() {
  const [url, setUrl] = useState("");
  const [shortedUrl, setshortedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  var totalClicks = 0;
  const firebase = useFirebase();

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
  useEffect(() => {
    if (firebase.user != null) {
      firebase.fetchLinksFromEmail(firebase.user.email)?.then(links => {
        setLinks(links.docs)
      })
    }
  }, [firebase])
  if (firebase.user == null) {
    return <h1 style={{ display: 'flex', justifyContent: 'center', height: 'calc(100vh - 85px - 85px)' }}>Please Login</h1>
  }
  return (
    // minHeight: 'calc(100vh - 85px - 85px)'
    // minHeight:'900px'
    <div className='max-width horizontal-center col-flex links-page'>
      <Form noValidate onSubmit={handelPutData}>
        <InputGroup size="lg" className="my-3 px-3" style={{ boxShadow: '0 1px 2px #e9ecef' }}>
          <Form.Control onChange={(e) => setUrl(e.target.value)} value={url}
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
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <Button onClick={handelPutData} style={{ fontSize: '19px', fontWeight: 'bold', with: '200px' }} className='google-fonts-noto' variant="warning" id="button-addon2">
          Shorten URL{' >'}
        </Button>
      </div>
      <div className='row-flex' style={{ display: 'flex', justifyContent: 'center' }}>
        {loading ? (<Spinnerr />) : (null)}
      </div>
      <ShowShortedUrl url={shortedUrl} />
      {links.map(data => (
        totalClicks = totalClicks + data.data().clicks,
        <LinksCard shortedUrl={data.data().shortUrl} clicks={data.data().clicks} originalUrl={data.data().originalUrl} />))}

      <div className='link-card-center'>
        <div className='stats-card col-flex'  >
          <div className='google-fonts-noto stats-card-stats text-center py-2' >Stats</div>
          <div className='google-fonts-poopins my-3 text-center'>Total Clicks:- {totalClicks}</div>
          <div className='google-fonts-poopins text-center mb-3'>Total Links:- {links.length}</div>
        </div>
      </div>
      <div className='link-card-center'>
        <div className='about-site-card col-flex' style={{ backgroundColor: '#f6f8f9' }} >
          <div className='google-fonts-noto about-site-card-about text-center py-2' >About Todo</div>
          <div className='mx-3 my-3 text-center google-fonts-roboto'>
            Creating, sharing, and monitoring your short links is easy with iLinkShort. We help you work faster and more intelligently with features like branded links and the ability to update the redirect of any link.
            <div className='my-3'></div>
            Make your links powerful marketing assets. Custom domains replace "iLinkShort” with your own domain name, making your links consistently recognizable across channels. They’re so powerful, businesses that use them get up to 34% more clicks.
            <div className='my-3'></div>
            iLinkShort also supports OneLinks which gives you the ability to connect your audiences to all of your content with one link. OneLinks are great for social media profiles.
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinksPage
