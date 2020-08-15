import React from 'react';

import classes from './Backdrop.module.css';
const backdrop = (props) =>( // fades entrire screen except modal because of css property

    props.show ? <div className={classes.Backdrop}
                       onClick = {props.clicked}>

    </div>  : null

);

export default backdrop;

