export function replaceById(arr, obj) {
    const unchangedItems = arr.filter(item => {
        return item.id !== obj.id;
    });
    return [...unchangedItems, obj];
}

export function removeById(arr, id) {
    return arr.filter(item => {
        return item.id !== id;
    })
}