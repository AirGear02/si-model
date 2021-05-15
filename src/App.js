import './App.css';
import { Grid, Box, Container } from '@material-ui/core';
import SliderParameter from './components/sliderParameter'
import { useEffect, useState } from 'react';
import MathJax from 'react-mathjax';
import countGraphic from './helpers/countGraphic';
import { Line } from 'react-chartjs-2'
import { defaults } from 'react-chartjs-2';
import {
  DEFAULT_DELTA1,
  DEFAULT_DELTA2,
  DEFAULT_GAMMA1,
  DEFAULT_GAMMA2,
  DEFAULT_I0,
  DEFAULT_S0,
  DEFAULT_TAU,
  DEFAULT_TAU1,
  DEFAULT_TAU2,
  DEFAULT_BETA,
} from './constants';


defaults.animation = false;

function App() {
  const [delta1, setDelta1] = useState(DEFAULT_DELTA1);
  const [delta2, setDelta2] = useState(DEFAULT_DELTA2);
  const [tau1, setTau1] = useState(DEFAULT_TAU1);
  const [tau2, setTau2] = useState(DEFAULT_TAU2);
  const [gamma1, setGamma1] = useState(DEFAULT_GAMMA1);
  const [gamma2, setGamma2] = useState(DEFAULT_GAMMA2);
  const [s0, setS0] = useState(DEFAULT_S0);
  const [i0, setI0] = useState(DEFAULT_I0);
  const [beta, setBeta] = useState(DEFAULT_BETA);
  const [tau, setTau] = useState(DEFAULT_TAU);
  const [graphRes, setGraphRes] = useState([[], [], []]);

  const data = {
    labels: graphRes[2],
    datasets: [
      {
        label: 'Susceptible',
        data: graphRes[0],
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Infected',
        data: graphRes[1],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };


  const formula = `\\frac{dS}{dt} = - \\beta*S(t)*I(t-\\tau)/N + 
    \\chi_1*I*(t-\\tau_1) - \\delta_1*S(t)`;
  const formula2 = `\\frac{dI}{dt} = \\beta*S(t)*I(t-\\tau)/N -
    \\chi_2*I*(t-\\tau_2) + \\delta_2*S(t)`;



  const changeParameter = (value, setStateFn) => {
    setStateFn(value);
  }

  useEffect(() => {
    const [s, i, t] = countGraphic(s0, i0, tau1, tau2, tau, gamma1, gamma2, delta1, delta2, beta);
    setGraphRes([s, i, t]);
  }, [s0, i0, delta1, delta2, tau1, tau2, gamma1, gamma2, tau, beta]);


  return (
    <Grid container style={{ width: "100%" }}>
      <Grid item style={{ width: "32%" }}>
        <Container >
          <Box justifyContent="left" >
            <MathJax.Provider style={{ textAlign: "left" }}>
              <MathJax.Node formula={formula} style={{ textAlign: "left" }} />
            </MathJax.Provider>
            <MathJax.Provider style={{ textAlign: "left" }}>
              <MathJax.Node formula={formula2} style={{ textAlign: "left" }}/>
            </MathJax.Provider>
          </Box>
          <SliderParameter
            min={1}
            max={100}
            label={"S_0"}
            step={1}
            defaultValue={DEFAULT_S0}
            onChange={(value) => changeParameter(value, setS0)}
          />
          <SliderParameter
            min={0}
            max={100}
            label={"I_0"}
            step={1}
            defaultValue={DEFAULT_I0}
            onChange={(value) => changeParameter(value, setI0)}
          />
          <SliderParameter
            min={0}
            max={20}
            label={`\\tau`}
            step={1}
            defaultValue={DEFAULT_TAU}
            onChange={(value) => changeParameter(value, setTau)}
          />
          <SliderParameter
            min={0}
            max={20}
            label={`\\tau_1`}
            step={1}
            defaultValue={DEFAULT_TAU1}
            onChange={(value) => changeParameter(value, setTau1)}
          />
          <SliderParameter
            min={0}
            max={20}
            label={`\\tau_2`}
            step={1}
            defaultValue={DEFAULT_TAU2}
            onChange={(value) => changeParameter(value, setTau2)}
          />
          <SliderParameter
            min={0}
            max={2}
            label={`\\beta`}
            step={0.1}
            defaultValue={DEFAULT_BETA}
            onChange={(value) => changeParameter(value, setBeta)}
          />
          <SliderParameter
            min={0}
            max={2}
            label={`\\delta_1`}
            step={0.1}
            defaultValue={DEFAULT_DELTA1}
            onChange={(value) => changeParameter(value, setDelta1)}
          />
          <SliderParameter
            min={0}
            max={2}
            label={`\\delta_2`}
            step={0.1}
            defaultValue={DEFAULT_DELTA2}
            onChange={(value) => changeParameter(value, setDelta2)}
          />
          <SliderParameter
            min={0}
            max={2}
            label={`\\chi_1`}
            step={0.1}
            defaultValue={DEFAULT_GAMMA1}
            onChange={(value) => changeParameter(value, setGamma1)}
          />
          <SliderParameter
            min={0}
            max={2}
            label={`\\chi_2`}
            step={0.1}
            defaultValue={DEFAULT_GAMMA2}
            onChange={(value) => changeParameter(value, setGamma2)}
          />
        </Container>

      </Grid>
      <Grid item style={{ width: "68%" }}>
        <Line data={data} type={'line'} options={{ scaleShowLabels: false }} />
      </Grid>
    </Grid>
  );
}

export default App;
