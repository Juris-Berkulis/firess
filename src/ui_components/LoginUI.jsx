import React from 'react';

export const LoginUI = (props) => {
    return (
        <div className={props.classes.SigLogWrapper}>
            <div className={props.classes.SigLogField}>
                {props.iAmGoingToSignup}
            </div>
        </div>
    )
};
