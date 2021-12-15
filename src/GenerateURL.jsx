import './generateURL.scss'
import { useState } from 'react'

export default function GenerateURL() {
    return (
        <div className='container'>
            <h2>Generate Marketing URL</h2>
            <form action="">
                <div className="formInput">
                    <label>Website Name:</label>
                    <input type="text" required placeholder='website url'/>
                </div>
                <div className="formInput">
                    <label>UTM_SOURCE</label>
                    <input type="text" required placeholder='ex. facebook, google, newsletter'/>
                </div>
                <div className="formInput">
                    <label>UTM_MEDIUM</label>
                    <input type="text" required placeholder='ex: cpc, display, email, social'/>
                </div>
                <div className="formInput">
                    <label>UTM_CAMPAIGN</label>
                    <input type="text" placeholder='ex: "spring_shoes", "50%off_sale"'/>
                </div>
                <div className="formInput">
                    <label>UTM_TERM</label>
                    <input type="text" placeholder='ex: "best marketing software"'/>
                </div>
                <button>GENERATE URL</button>
            </form>           
        </div>
    )
}
