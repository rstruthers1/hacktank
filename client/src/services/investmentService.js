import axios from "axios";


const API_URL = "/investment";

const getInvestorHacksInvestments = (id) => {
    return axios.get(`${API_URL}/investors/${id}/hacks/investments`);
}

const postInvestorHacksInvestments = (investorId, investments) => {
    return axios.post(`${API_URL}/investors/${investorId}/hacks/investments`, investments);
}

const getInvestor = (id) => {
    return axios.get(`${API_URL}/investors/${id}`);
}

const getHackInvestmentTotals = () => {
    return axios.get(`${API_URL}/hacks/investments/totals`);
}

const InvestmentService = {
    getInvestorHacksInvestments,
    postInvestorHacksInvestments,
    getInvestor,
    getHackInvestmentTotals
}

export default InvestmentService;