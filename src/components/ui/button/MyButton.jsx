import React, {Component} from 'react';
import Button from "@mui/material/Button";

function MyButton({children, ...props}) {
    return (
        <Button {...props} className='form__input' variant="contained"
                size="large">
            {children}
        </Button>
    );
}

export default MyButton;