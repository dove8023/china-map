export async function sleep(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, num);
    })
}


export default {
    NAMES: [111, 222, 333]
}