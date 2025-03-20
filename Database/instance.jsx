import axios from "axios";

export const kanban = axios.create({
    baseURL: 'http://localhost:3000/'
   
});