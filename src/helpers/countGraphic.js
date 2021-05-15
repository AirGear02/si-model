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
} from '../constants';

const h = 0.1;
const t_max = 100;

let S = []
let I = []
let T = []

let tau1 = DEFAULT_TAU1;
let tau2 = DEFAULT_TAU2;
let tau = DEFAULT_TAU;
let gamma1 = DEFAULT_GAMMA1;
let gamma2 = DEFAULT_GAMMA2;
let delta1 = DEFAULT_DELTA1;
let delta2 = DEFAULT_DELTA2;
let s0 = DEFAULT_S0;
let i0 = DEFAULT_I0;
let beta = DEFAULT_BETA;
let n = DEFAULT_S0 + DEFAULT_I0;


const s = (index) => {
    const i_val = index - tau / h < 0 ? I[0] : I[Math.round(index - tau / h)];
    const i_val1 = index - tau1 / h < 0 ? I[0] : I[Math.round(index - tau1 / h)];
    return -beta * S[index] * i_val / n + gamma1 * i_val1 - delta1 * S[index]
}

const i = (index) => {
   
    const i_val = index - tau / h < 0 ? I[0] : I[Math.round(index - tau / h)];
    const i_val2 = index - tau2 / h < 0 ? I[0] : I[Math.round(index - tau2 / h)];
    return beta * S[index] * i_val / n - gamma2 * i_val2 + delta2 * S[index]
}

export default function countGraphic(_s0, _i0, _tau1, _tau2, _tau, _gamma1, _gamma2, _delta1, _delta2, _beta) {
    s0 = _s0;
    i0 = _i0;
    tau1 = _tau1;
    tau2 = _tau2;
    tau = _tau;
    delta1 = _delta1;
    delta2 = _delta2;
    gamma1 = _gamma1;
    gamma2 = _gamma2;
    n = s0 + i0;
    beta = _beta;
    S = [s0]
    I = [i0]
    T = []
    let t = 0

    let curr_index = 0
    while(t <= t_max) {
        t += h
        const s_res = S[curr_index] + h * s(curr_index)
        const i_res = I[curr_index] + h * i(curr_index)
        if(isNaN(s_res) || isNaN(i_res)) break;
        S.push(s_res)
        I.push(i_res)
        T.push(t.toFixed(2))
        curr_index += 1
    }

    return [S, I, T]
}