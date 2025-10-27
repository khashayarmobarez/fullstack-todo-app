export function sortToDos(toDos) {
    const sortedData = {};
    toDos.forEach((item) => {
        if (!sortedData[item.status]) {
            sortedData[item.status] = [];
        }
        sortedData[item.status].push(item);
    });

    return sortedData;
}