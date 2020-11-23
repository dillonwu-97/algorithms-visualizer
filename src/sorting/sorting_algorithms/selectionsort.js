import swap from './lib'

function selectionsort(array) {
    let ret_values = []
    for (let i = 0; i < array.length-1; i++) {
        let mindex = i
        for (let j = i+1; j < array.length; j++) {
            if (array[j] < array[mindex]) {
                mindex = j
            }
        }
        let ret_value = swap(array, mindex, i)
        ret_values.push(ret_value)
    }
    return ret_values
}

export default selectionsort