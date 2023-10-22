import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import InvestmentService from "../services/investmentService";

export const fetchHackInvestmentTotals = createAsyncThunk(
    'hackInvestmentTotals/fetchHackInvestmentTotals',
    async (id) => {
        const response = await InvestmentService.getHackInvestmentTotals();
        console.log(`response: ${JSON.stringify(response, null, 2)}`)
        return response.data;
    },
);

const initialState = {
    hackInvestmentTotals: [],
    status: 'idle',
    error: null
};

const hackInvestmentTotalsSlice = createSlice({
    name: 'hackInvestmentTotals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHackInvestmentTotals.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchHackInvestmentTotals.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.hackInvestmentTotals = action.payload;
                }

            })
            .addCase(fetchHackInvestmentTotals.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message;
            })
    }
})


export const getHackInvestmentTotals = (state) => {console.log(`state: ${JSON.stringify(state, null, 2)}`); return state.hackInvestmentTotals.hackInvestmentTotals};
export const getHackInvestmentTotalsStatus = (state) => state.hackInvestmentTotals.status;
export const getHackInvestmentTotalsError = (state) => state.hackInvestmentTotals.error;


const {reducer} = hackInvestmentTotalsSlice;
export default reducer;