// src/utils/sortToDos.js
export function sortToDos(toDos) {
    const sortedData = {
        todo: [],
        inProgress: [],
        review: [],
        done: []
    };
    
    if (!toDos || !Array.isArray(toDos)) {
        return sortedData;
    }
    
    toDos.forEach((item) => {
        if (item && item.status && sortedData[item.status]) {
            sortedData[item.status].push(item);
        }
    });

    return sortedData;
}