import axios from 'axios';
import { toast } from 'react-toastify';

const startListening = (setListening, navigate, fetchList) => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US, en-IN, hi-IN";
    recognition.start();

    recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Heard:", transcript);

        if (transcript.includes("add")) {
            const itemName = transcript.replace("add", "").trim();
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/add`, {
                name: itemName,
                category: "uncategorized",
                quantity: 1,
                price: 0,
            });
            toast.success(`${itemName} added successfully!`);
            navigate("/list");
            // Only call fetchList if it's provided (when called from List page)
            if (fetchList && typeof fetchList === 'function') {
                fetchList();
            }
        } else if (transcript.includes("remove") || transcript.includes("delete")) {
            const itemName = transcript.replace("delete", "").replace("remove", "").trim();
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/remove/${itemName}`);
            toast.success(`${itemName} deleted successfully!`);
            // Only call fetchList if it's provided (when called from List page)
            if (fetchList && typeof fetchList === 'function') {
                fetchList();
            }
            navigate("/list");
        }
    }
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
}

export default startListening;