const baseURL = import.meta.env.VITE_API_URL;
export function getFullUrl(path) {
    return `${baseURL}${path}`;
}