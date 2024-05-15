import axios from 'axios'

const API_URL = 'http://localhost:5001/notes'


export const createNote = async (note) => {
    try {
        const response = await axios.post(API_URL, note);
        return response.data;
    }   catch (error) {
        console.log('error creating note', error);
        throw error;
    };
};

export const fetchNotes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    }    catch (error) {
        console.log('error fetching notes', error);
        throw error;
    };
}; 