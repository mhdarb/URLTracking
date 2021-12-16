import './generateURL.scss'
import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SendOutlined } from '@mui/icons-material';

export default function GenerateURL() {
    const [copied, setCopied] = useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault();
        let url=''
        if(websiteUrl.length>0){
            url=`https://${websiteUrl}/?`;
        }
        if(source.length>0){
            url+="utm_source="+source;
        } 
        if(medium.length>0){
            url+="&"+"utm_medium="+medium;
        } 
        if(campaign.length>0){
            setCampaign(campaign.split(' ').join('-'))
            url+="&"+"utm_campaign="+campaign;
        } 
        if(term.length>0){
            setTerm(term.split(' ').join('-'))
            url+="&"+"utm_term="+term;
        } 
        setHashedUrl(url);
    }

    const [websiteUrl, setWebsiteUrl] = useState("")
    const [source, setSource] = useState("")
    const [medium, setMedium] = useState("")
    const [campaign, setCampaign] = useState("")
    const [term, setTerm] = useState("")
    const [hashedUrl, setHashedUrl] = useState("")
    return (
        <div className='container'>
            <h2>Generate Marketing URL</h2>
            <div className="hashedUrlContainer">
                <input type="text" 
                    placeholder='Get your marketing hashed url just by filling the form details below' 
                    value={hashedUrl} 
                    onChange={({ target: { value } }) => {
                        setHashedUrl(value);
                        setCopied(false);
                    }}
                />
                {hashedUrl &&
                <CopyToClipboard text={hashedUrl} onCopy={() => setCopied(true)}>
                    <ContentCopyIcon className='copyIcon'/>
                </CopyToClipboard>
                }
            </div>
            {copied ? <span style={{ color: "yellow", margin:"0px"}}>Copied Url</span> : null}
            <form action="" onSubmit={handleSubmit}>
                <div className="formInput">
                    <label>WEBSITE URL </label>
                    <input type="text" required="true" placeholder='ex. google.com' onChange={(e)=>setWebsiteUrl(e.target.value)}/>
                </div>
                <div className="formInput">
                    <label>UTM_SOURCE</label>
                    <input type="text" required="true" placeholder='ex. facebook, google, newsletter' onChange={(e)=>setSource(e.target.value)}/>
                </div>
                <div className="formInput">
                    <label>UTM_MEDIUM</label>
                    <input type="text" required="true" placeholder='ex: cpc, display, email, social' onChange={(e)=>setMedium(e.target.value)}/>
                </div>
                <div className="formInput">
                    <label>UTM_CAMPAIGN</label>
                    <input type="text" placeholder='ex: "spring_shoes", "50%off_sale"' onChange={(e)=>setCampaign(e.target.value)}/>
                </div>
                <div className="formInput">
                    <label>UTM_TERM</label>
                    <input type="text" placeholder='ex: "best marketing software"' onChange={(e)=>setTerm(e.target.value)}/>
                </div>
                <button >GENERATE URL <SendOutlined style={{marginLeft:"5px"}}/></button>
            </form>           
        </div>
    )
}
