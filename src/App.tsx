import React, {useEffect, useState} from 'react';
import './App.css';
import {Display} from "./components/Display/Display";
import {Button} from "./components/Button/Button";
import {InputForm} from "./components/InputForm/InputForm";

function App() {
    let localStorageStartValue = Number(localStorage.getItem("startValue"))
    let localStorageMaxValue = Number(localStorage.getItem("maxValue"))

    useEffect(() => {
        setStartValue(localStorageStartValue)
        setMaxValue(localStorageMaxValue)
    }, [localStorageStartValue, localStorageMaxValue])

    let [startValue, setStartValue] = useState<number>(0)
    let [maxValue, setMaxValue] = useState<number>(5)
    let [prompt, setPrompt] = useState<string>("")
    let [disabledInc, setDisabledInc] = useState<boolean>(false)
    let [disabledReset, setDisabledReset] = useState<boolean>(false)
    let [disabledSet, setDisabledSet] = useState<boolean>(true)
    let [displayedDigit, setDisplayedDigit] = useState<number>(localStorageStartValue)

    function onValueChange(inputDigit: number, title: string) {
        if (title === "start value:") {
            startValue = inputDigit
            setStartValue(startValue)
        } else if (title === "max value:") {
            maxValue = inputDigit
            setMaxValue(maxValue)
        }
        changePrompt()
        setDisabledInc(true)
        setDisabledReset(true)
    }

    function changePrompt() {
        if (startValue < 0 || maxValue <= startValue) {
            setDisabledSet(true)
            setPrompt("Incorrect value!")
        } else {
            setDisabledSet(false)
            setPrompt("enter values and press 'set'")
        }
    }

    function onSetButtonClick() {
        setDisabledSet(true)
        setDisabledInc(false)
        setDisabledReset(false)
        setPrompt("")
        setDisplayedDigit(startValue)
        localStorage.setItem("startValue", startValue.toString())
        localStorage.setItem("maxValue", maxValue.toString())
    }


    function changeDigit(displayedDigit: number) {
        setDisplayedDigit(displayedDigit)
        disableButton(displayedDigit)
    }

    function disableButton(displayedDigit: number) {
        if (displayedDigit === maxValue) {
            setDisabledInc(true)
        } else if (displayedDigit === startValue) {
            setDisabledInc(false)
        } else {
            setDisabledReset(false)
        }
    }

    return (
        <div className={"app-wrapper"}>
            <div className="value-setter-wrapper">
                <div className="inputBlock">
                    <InputForm title={"max value:"} inputDigit={maxValue} onChange={onValueChange} prompt={prompt}/>
                    <InputForm title={"start value:"} inputDigit={startValue} onChange={onValueChange}
                               prompt={prompt}/>
                </div>
                <div className="btnBlock">
                    <Button title={"set"}
                            disabled={disabledSet}
                            onSetButtonClick={onSetButtonClick}/>
                </div>
            </div>
            <div className="counter-wrapper">
                <Display displayedDigit={displayedDigit} maxValue={maxValue} prompt={prompt}/>
                <div className="btnBlock">
                    <Button title={"inc"} disabled={disabledInc} changeDigit={changeDigit} displayedDigit={displayedDigit}/>
                    <Button title={"reset"}
                            disabled={disabledReset}
                            changeDigit={changeDigit}
                            displayedDigit={displayedDigit}
                            startValue={startValue}/>
                </div>
            </div>
        </div>
    )
}

export default App;
