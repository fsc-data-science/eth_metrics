export function mergeData(x, y, id) {
    return x.map(itemX => {
        const matchingItemY = y.find(itemY => itemY[id] === itemX[id]);
    
        if (matchingItemY) {
        return {
            ...itemX,
            ...matchingItemY,
        };
        } else {
        // If no match is found in y, return the item from x as is
        return itemX;
        }
    });
    }

    const x = [
        { a: 1, b: 4 },
        { a: 2, b: 5 },
        { a: 3, b: 6 },
        { a: 4, b: 7 },
    ];
    
    const y = [
    { b: 4, z: 'g' },
    { b: 5, z: 'h' },
    { b: 6, z: 'i' },
    ];
    
    const merged = mergeData(x, y, 'b');
    console.log(merged);