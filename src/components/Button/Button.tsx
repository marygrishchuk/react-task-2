import React from "react";
import s from './Button.module.css';

type PropsType = {
    title: "inc" | "reset" | "set"
    disabled: boolean
    changeDigit?: (counterDigit: number) => void
    counterDigit?: number
    onSetButtonClick?: () => void
    startValue?: number
}

export function Button(props: PropsType) {

    let onClickHandler = () => {
        if (props.title === "inc") {
            props.changeDigit && props.counterDigit   //if props.changeDigit and props.counterDigit are defined
            && props.changeDigit(props.counterDigit + 1)
        } else if (props.title === "reset") {
            props.changeDigit && props.startValue    //if props.changeDigit and props.startValue are defined
            && props.changeDigit(props.startValue)
        } else if (props.title === "set") {
            props.onSetButtonClick                   //if props.onSetButtonClick is defined
            && props.onSetButtonClick()
        }
    }

    return (
        <button className={s.btn} disabled={props.disabled} onClick={onClickHandler}>
            {props.title}
        </button>
    )
}