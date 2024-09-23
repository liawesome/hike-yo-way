export default function getUrl(path) {
    const baseURL = import.meta.env.VITE_API_URL;
    return `${baseURL}${path}`;
}