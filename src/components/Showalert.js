import React, {useContext} from 'react'
import Alert from './Alert'
import alertContext from '../contexts/alerts/alertContext'

function Showalert() {
    const alertObj = useContext(alertContext);
  return (
    <div style={{height : "120px", overflow: "hidden"}}>
        <Alert alert={alertObj.alert}/>
    </div>
  )
}

export default Showalert