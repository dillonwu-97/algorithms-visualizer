// import swap from './lib'
// a = [5,6,1,2,3,2]
// b = mergesort(a)
// console.log(b)
// console.log("ret values are ", ret_values)
function mergesort(array) {
    let mid, right
    let ret_values = []
    for (let current = 1; current < array.length; current *=2) {
        for (let left=0; left < array.length -1; left+= 2 * current) {
            mid = Math.min(left + current - 1, array.length - 1)
            right = Math.min(left + 2 * current - 1, array.length - 1)
            merge(array, left, mid, right, ret_values)
            // console.log(array)
        }
    }
    return ret_values
}


function merge(array, l, m, r, ret_values) {

    let n1 = m - l + 1;
    let n2 =  r - m;

    let left_array = array.slice(l, m+1)
    let right_array = array.slice(m+1, 1+r)
    let ret_seg = []
    // console.log(array, left_array, right_array, l, m, n1, n2)

    let i=0, j=0, k=l
    while(i < n1 && j < n2) {
        if (left_array[i] <= right_array[j]) {
            // console.log(array[k], left_array[i])
            if (array[k] != left_array[i]) {
                array[k] = left_array[i]
                ret_seg.push([k, left_array[i]])
            }
            i++
        } else {
            // console.log(array[k], right_array[j])
            if (array[k] != right_array[j]) {
                array[k] = right_array[j]
                ret_seg.push([k, right_array[j]])
            }
            j++
        }
        k++
    }
    
    while (i < n1) {
        if (array[k] != left_array[i]) {
            array[k] = left_array[i]
            ret_seg.push([k, left_array[i]])
        }
        i++
        k++
    }

    while (j < n2) {
        if (array[k] != right_array[j]) {
            array[k] = right_array[j]
            ret_seg.push([k, right_array[j]])
        }
        j++
        k++
    }
    ret_values.push(ret_seg)
}

export default mergesort