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

const InvestmentService = {
    getInvestorHacksInvestments,
    postInvestorHacksInvestments,
    getInvestor
}

export default InvestmentService;