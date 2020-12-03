import React, {useState, useRef} from 'react'
import {Card, CardContent, CardHeader, Button} from '@material-ui/core';
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
const Share = () => {
    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);
  
    function copyToClipboard(e) {
      textAreaRef.current.select();
      document.execCommand('copy');
      // This is just personal preference.
      // I prefer to not show the whole text area selected.
      e.target.focus();
      setCopySuccess('Copied!');
    };
    const history = useHistory()
    return (
        <div>
        <Button color="secondary" className="button" onClick={()=> history.goBack()}>Back</Button>
        {
         /* Logical shortcut for only displaying the 
            button if the copy command exists */
         document.queryCommandSupported('copy') &&
          <div>
            <button onClick={copyToClipboard}>Copy</button> 
            {copySuccess}
          </div>
        }
        <form>
          <textarea
            ref={textAreaRef}
            value='https://congress-votes-react.herokuapp.com/'
          />
        </form>
      </div>
    )
}
export default Share