import swap from './lib'
function insertionsort(array) {
    // console.log(array.length)
    let ret_values = []
    let swap_value = []
    for (let i = 1; i < array.length; i++) {
        let j = i - 1
        let key = array[i]
        while (j >= 0 && array[j] > key) {
            swap_value = swap(array, j, j+1)
            ret_values.push(swap_value)
            j-=1
        }
    }
    return ret_values
}

export default insertionsort