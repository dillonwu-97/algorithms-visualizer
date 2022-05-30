function create_grid() {
    let grid = []
    for (let i = 0; i < global.rc; i++) {
        let temp = []
        for (let j = 0; j < global.cc; j++) {
            temp.push(0)
        }
        grid.push(temp)
    }
    return grid
}

export { create_grid }
