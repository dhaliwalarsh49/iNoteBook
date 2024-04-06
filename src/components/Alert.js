import React from 'react'

export default function Alert(props) {
    return (
        props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" style={{marginTop: "60px"}}>
            <strong>{props.alert.msg}</strong>
        </div>
    )
}