import Slider from '@material-ui/core/Slider';
import MathJax from 'react-mathjax';
import {Box} from '@material-ui/core';
import { useState } from 'react';
import Input from '@material-ui/core/Input';


export default function SliderParameter({label, onChange, defaultValue, min, max, step}) {
    const [value, setValue] = useState(defaultValue);
    return (
        <Box display="flex" style={{ alignItems: "center", margin: "6px"}}>
            <Box marginRight="1em">
                <MathJax.Provider>
                    <MathJax.Node formula={label} />
                </MathJax.Provider>
            </Box>

            <Slider
                aria-labelledby="discrete-slider-always"
                step={step}
                valueLabelDisplay="auto"
                min={min}
                max={max}
                value={value}
                onChange={(e, value) => {setValue(value); onChange(value)}}
                style={{marginRight: "20px"}}
            />
            <Input
                value={value}
                margin="dense"
                onChange={(e) => { onChange(Number.parseFloat(e.target.value)); setValue(Number.parseFloat(e.target.value));}}
                inputProps={{
                    step: step,
                    min: min,
                    max: max,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }}
            />
        </Box>
    )
}