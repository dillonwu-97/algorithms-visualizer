const d3 = require('d3')




// const Circle = () => {
//     const ref = useRef() // stores reference to rendered svg element

//     useEffect(() => {
//         // d3.select turns ref into d3 selection object
//         const svgElement = d3.select(ref.current)
//         svgElement.append("circle")
//             .attr("cx", 150)
//             .attr("cy", 70)
//             .attr("r", 50)
//     }, [])

//     return (
//         <svg ref = {ref} />
//     )
// }

// const Circle = () => {
//     return (
//         <svg>
//             <circle 
//                 cx = "150"
//                 cy = "70"
//                 r = "50"
//             />
//         </svg>
//     )
// }

// this does not work / is buggy
// const Circle = () => {
//     const [dataset, setdataset] = useState(generateDataset())
//     const ref = useRef()

//     useEffect(() => {
//         // select all elements that are of the element circle i think?
//         const svgElement = d3.select(ref.current)
//         svgElement.selectAll("circle")
//         .data(dataset)
//         .join("circle")
//         .attr("cx", d=>dataset[0])
//         .attr("cy", d=>dataset[1])
//         .attr("r", 3)
//     }, [dataset])

//     // fires off every 2 seconds
//     useInterval(() => {
//         const d = generateDataset()
//         setdataset(d)
//     }, 2000)

//     return (
//         <svg viewBox ="0 0 100 50" ref = {ref}/>

//     )

// }


// used to show circles at random locations using d3
// const Circle = () => {
//     const [data, setdata] = useState(generateDataset())
//     useInterval(() => {
//         const newdata = generateDataset()
//         setdata(newdata)
//     }, 2000)
//     console.log(data)
//     return (

//         // x = 0 y = 0 width = 100% height = 50%
//         <svg viewBox= "0 0 100 50" >
//             {data.map(i => (
//                 // console.log("i is ", i)
//                 <circle 
//                     cx = {i[0]}
//                     cy = {i[1]}
//                     r = "3"
//                     fill = "tomato"
//                 />
//             ))}
//         </svg>

//     )

// }