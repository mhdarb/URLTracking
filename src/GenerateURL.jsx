import './generateURL.scss'
import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function GenerateURL() {
    const [copied, setCopied] = useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault();
        let url=`https://${websiteUrl}?`;
        if(source.length>0){
            url+="utm_source="+source;
        } 
        if(medium.length>0){
            url+="&"+"utm_medium="+medium;
        } 
        if(campaign.length>0){
            url+="&"+"utm_campaign="+campaign;
        } 
        if(term.length>0){
            setTerm(term.split(' ').join('-'))
            url+="&"+"utm_campaign="+term;
        } 
        setHashedUrl(url);
        console.log(url);
    }

    const handleCopy = (e) =>{
        e.target.select()
        document.execCommand("copy")
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
                <CopyToClipboard text={hashedUrl} onCopy={() => setCopied(true)}>
                    <ContentCopyIcon className='copyIcon' onClick={handleCopy}/>
                </CopyToClipboard>
            </div>
            {copied ? <span style={{ color: "green", margin:"0px"}}>Copied Url</span> : null}
            <form action="">
                <div className="formInput">
                    <label>Website Name:</label>
                    <input type="text" required="true" placeholder='website url' onChange={(e)=>setWebsiteUrl(e.target.value)}/>
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

                <button onClick={handleSubmit}>GENERATE URL</button>
            </form>           
        </div>
    )
}
