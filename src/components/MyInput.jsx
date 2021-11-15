import React from 'react';
import TextField from "@mui/material/TextField";

function MyInput({...props}) {
    return (
        <TextField {...props} className='form__input' id="outlined-basic" variant="outlined" size="small"/>
    )
}

export default MyInput;