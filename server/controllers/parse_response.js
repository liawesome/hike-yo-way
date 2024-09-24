
 function parseResponseToJson(response){
    try {
        const jsonRegex = /```(?:json)?\s*([\s\S]*?)```/;
        const match = response.match(jsonRegex);
        
        if (match && match[1]) {
            const jsonContent = match[1].trim();
            return JSON.parse(jsonContent);
        } else {
            return JSON.parse(response);
        }
    } catch (error) {
        console.error('Error parsing response:', error);
        return [];
    }
}


export default parseResponseToJson;