import swap from './lib'

function heapsort(array) {
    let ret_values = []
    for (let i = array.length / 2 - 1; i >= 0; i--) {
        heapify(array, array.length, i, ret_values)
    }
    for (let i = array.length - 1; i > 0; i--) {
        let swap_val = swap(array, 0, i)
        ret_values.push(swap_val)
        heapify(array, i, 0, ret_values)
    }
    // console.log(array)
    return ret_values
}

 
function heapify(array, n, i, ret_values) {
    let largest = i
    let left = 2 * i + 1
    let right = 2 * i + 2

    if (left < n  && array[left] > array[largest]) {
        largest = left
    }
    if (right < n && array[right] > array[largest]) {
        largest = right
    }
    // console.log(ret_values)
    if (largest != i) {
        let swap_val = swap(array, i, largest)
        ret_values.push(swap_val)
        heapify(array, n, largest, ret_values)
    }
}

export default heapsort