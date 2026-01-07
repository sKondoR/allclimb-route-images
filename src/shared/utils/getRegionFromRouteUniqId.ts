export const getRegionFromRouteUniqId = (str: string) => {
    const indices = [];
    let index = -1;
    while ((index = str.indexOf('/', index + 1)) !== -1) {
        indices.push(index);
    }
    if (indices.length < 3) {
        return ''; 
    }
    const start = indices[0] + 1;
    const end = indices[2];
    return str.slice(start, end);
};
