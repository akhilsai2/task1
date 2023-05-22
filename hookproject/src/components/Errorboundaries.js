import {Component} from 'react'

class Errorboundaries extends Component {
  state={error:false}

  componentDidCatch(error){
    this.setState({error:error})
    console.log(error)
  }
   render(){
    const {error}=this.state 
    
    if (error){
  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <h1>Oops! Something went wrong</h1>
        <p style={{color:"red"}}>{error.message}</p>
        <button onClick={()=>this.setState({error:false})} >Go Back</button>
    </div>
  )
    }
    return this.props.children
   }
}

export default Errorboundaries