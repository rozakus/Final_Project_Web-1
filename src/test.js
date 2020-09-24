// import React from 'react'
// import { FormGroup, FormControlLabel,  Checkbox } from '@material-ui/core'

// const DATA = [
//     { id : 1, name : 'alpha'},
//     { id : 2, name : 'beta'},
//     { id : 3, name : 'gamma'},
//     { id : 4, name : 'etha'},
// ]

// const App = () => {
//     const [state, setState] = React.useState([])

//     const _handeChange = (event) => {
//         console.log(event.target.value)
//         const id = event.target.value
//         const name = event.target.name
//         let change = false

//         // check selected index
//         state.forEach((item, index) => {
//             if (item.id === id) {
//                 setState(prevstate => {
//                     let temp = [...prevstate]
//                     temp.splice(index, 1)
//                     return temp
//                 })
//                 change = true
//             }
//         })

//         if (!change) {
//             setState(prevstate => {
//                 let temp = [...prevstate]
//                 temp.push({ id, name, qty : 1})
//                 return temp
//             })
//         }
            
//     }

//     const _renderCheckList = () => {
//         return DATA.map(item => (
//             <FormControlLabel
//                 key={item.id}
//                 control={<Checkbox onChange={_handeChange} value={item.id} name={item.name}/>}
//                 label={item.name}
//           />
//         ))
//     }

//     React.useEffect(() => console.log(state))

//     return (
//         <div>
//             {_renderCheckList()}
//         </div>
//     )
// }

// export default App

const a = 10000
console.log(a.toLocaleString())