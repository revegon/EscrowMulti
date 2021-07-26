// collected from: https://stackoverflow.com/questions/40774697/how-to-group-an-array-of-objects-by-key
export const groupBy = (arr, key, keepKey = false) => {
    const result = arr.reduce((res, obj) => {
        const {[key]: value, ...rest} = obj;
        res[value] = res[value] || [];
        res[value].push(keepKey ? obj : rest);
        return res;
    }, Object.create(null));
    return result;
};
