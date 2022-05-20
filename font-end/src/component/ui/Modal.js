import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';
import { useAuthContext } from '../../context/AuthContext';


const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onCloseModal} />
}

const ModalOverLay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}


const portalElement = document.getElementById('overlays');

export default function Modal(props) {
    const {IsShowModal, onClickHiddenModal, onClickShowModal} = useAuthContext()
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onCloseModal={props.onCloseModal} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>, portalElement)}
        </Fragment>
    )
}