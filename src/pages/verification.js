import React from 'react'
import Axios from 'axios'
import { URL } from '../actions'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            verified : false
         }
    }

    async componentDidMount(){
        const token = this.props.location.search.substring(1)
        try {
            const res =await Axios.post(URL + `/verification`. { token })
            console.log(res.data)
            this.setState({ verified : true })
        } catch (error) {
            console.log(error)
        }
    }

    render() { 
        console.log(`location : `, this.props.location)
        console.log(`token : `, this.props.location.search.substring(1))

        return ( 
            <div style={{ paddingTop : '50px'}}>
                {
                    this.state.verified ?
                    <Link to='/'>
                        <Button variant="contained" color="primary">
                            Go To Home
                        </Button>
                    </Link>
                    :
                    <h1>Loading...</h1>
                }
            </div>
         );
    }
}
 
export default Verification;