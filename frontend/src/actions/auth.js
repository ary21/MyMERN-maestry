import * as api from '../api';
import { AUTH } from '../constants/type';

export const signin = (formData, history) => async (dispatch) => {
    try {
        // TODO login
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, history) => async (dispatch) => {
    try {
        // TODO signup
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};
