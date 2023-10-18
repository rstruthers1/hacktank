import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import InvestmentService from "../services/investmentService";

export const fetchInvestments = createAsyncThunk(
    'investment/fetchInvestments',
    async (id) => {
        const response = await InvestmentService.getInvestorHacksInvestments(id)
        console.log(`response: ${JSON.stringify(response, null, 2)}`)
        return response.data;
    },
);

export const postInvestments = createAsyncThunk(
    "investment/postInvestments",
    async ({id, investments}) => {
        const res = await InvestmentService.postInvestorHacksInvestments(id, investments);
        return res.data;
    }
);

const initialState = {
    investments: [],
    status: 'idle',
    operation: '',
    error: null
};

const investmentsSlice = createSlice({
    name: 'investments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvestments.pending, (state) => {
                state.status = 'loading';
                state.operation = 'fetch';
            })
            .addCase(fetchInvestments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.investments = action.payload

            })
            .addCase(fetchInvestments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message;
            })
            .addCase(postInvestments.pending, (state) => {
                state.status = 'loading';
                state.operation = 'save';
            })
            .addCase(postInvestments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.investments = action.payload
            })
            .addCase(postInvestments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message;
            })
    }
})


export const getInvestments = (state) => {console.log(`state: ${JSON.stringify(state)}`); return state.investments.investments};
export const getInvestmentsStatus = (state) => state.investments.status;
export const getInvestmentsError = (state) => state.investments.error;

export const postedInvestments = (state) => {console.log(`state: ${JSON.stringify(state)}`); return state.investments.investments};
export const  postedInvestmentsStatus = (state) => state.investments.status;
export const postedInvestmentsError = (state) => state.investments.error;

export const investmentsOperation = (state) => state.investments.operation;


const {reducer} = investmentsSlice
export default reducer;