
import axios from 'axios';

async function test() {
    try {
        const res = await axios.get('http://localhost:5000/api/curriculum/metadata', {
            params: { curriculum: 'CBSE', class: '10' }
        });
        console.log("Response:", JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error("Error:", err.message);
        if (err.response) {
            console.error("Response data:", err.response.data);
        }
    }
}

test();
