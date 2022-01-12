import React from 'react';

export const SignupUI = (props) => {
    return (
        <div className={props.classes.SigLogWrapper}>
            <div className={props.classes.SigLogField}>
                {props.iAmGoingToSignup}
            </div>
        </div>
    )
};
