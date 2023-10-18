import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import InvestmentService from "../services/investmentService";

export const fetchInvestor = createAsyncThunk(
    'investor/fetchInvestor',
    async (id) => {
        const response = await InvestmentService.getInvestor(id)
        console.log(`response: ${JSON.stringify(response, null, 2)}`)
        return response.data;
    },
);

const initialState = {
    investor: {},
    status: 'idle',
    error: null
};

const investorSlice = createSlice({
    name: 'investor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvestor.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchInvestor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.investor = action.payload
            })
            .addCase(fetchInvestor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.error?.message;
            })
    }
})


export const getInvestor = (state) => {console.log(`state: ${JSON.stringify(state, null, 2)}`); return state.investor.investor};
export const getInvestorStatus = (state) => state.investor.status;
export const getInvestorError = (state) => state.investor.error;


const {reducer} = investorSlice
export default reducer;