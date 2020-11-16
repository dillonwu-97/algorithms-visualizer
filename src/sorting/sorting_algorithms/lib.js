function swap (array,i,j) {
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
    let ret_val = [ [i, array[i]], [j, array[j]] ]
    return ret_val
}

export default swap 