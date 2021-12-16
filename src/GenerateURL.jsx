import './generateURL.scss'
import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SendOutlined } from '@mui/icons-material';
import cryptoJs from 'crypto-js';
var CryptoJS = require("crypto-js");


export default function GenerateURL() {
    const [copied, setCopied] = useState(false);
    let url=''
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(websiteUrl.length>0){
            url=`https://${websiteUrl}/?`;
        }
        addQueryParameter("utm_source=",source,false);
        addQueryParameter("utm_medium=",medium,true);
        addQueryParameter("utm_campaign=",campaign,true);
        addQueryParameter("utm_term=",term,true);
        
        setHashedUrl(url);
    }

    const addQueryParameter = (queryName,query,addAnd) =>{
        if(query.length>0){
            console.log("yes")
            url+=(addAnd?"&":"")+queryName+query;
            console.log(url)
        }
    }

    const encryptQuery = (queryParam) =>{
        const hashedQueryParam = CryptoJS.AES.encrypt(queryParam,"secretKey").toString();
        return hashedQueryParam
    }

    const decryptQuery = (hashedQuery) =>{
        let originalQuery = cryptoJs.AES.decrypt(hashedQuery,"secretKey")
        originalQuery = originalQuery.toString(CryptoJS.enc.Utf8)
        return originalQuery
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
                    <input type="text" required placeholder='ex. google.com' onChange={(e)=>setWebsiteUrl(e.target.value)}/>
                </div>
                <div className="formInput">
                    <label>UTM_SOURCE</label>
                    <input type="text" required placeholder='ex. facebook, google, newsletter' 
                        onChange={(e)=>{
                            const hashedQueryParam = encryptQuery(e.target.value);
                            setSource(hashedQueryParam)
                        }}
                    />
                </div>
                <div className="formInput">
                    <label>UTM_MEDIUM</label>
                    <input type="text" required placeholder='ex: cpc, display, email, social'  
                        onChange={(e)=>{
                            const hashedQueryParam = encryptQuery(e.target.value);
                            setMedium(hashedQueryParam)
                        }}
                    />
                </div>
                <div className="formInput">
                    <label>UTM_CAMPAIGN</label>
                    <input type="text" placeholder='ex: "spring_shoes", "50%off_sale"'  
                        onChange={(e)=>{
                            const hashedQueryParam = encryptQuery(e.target.value);
                            setCampaign(hashedQueryParam)
                        }}/>
                </div>
                <div className="formInput">
                    <label>UTM_TERM</label>
                    <input type="text" placeholder='ex: "best marketing software"' 
                        onChange={(e)=>{
                            const hashedQueryParam = encryptQuery(e.target.value);
                            setTerm(hashedQueryParam)
                        }}/>
                </div>
                <button >GENERATE URL <SendOutlined style={{marginLeft:"5px"}}/></button>
            </form>           
        </div>
    )
}
