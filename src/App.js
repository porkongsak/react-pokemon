import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';



export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      query: "eevee",
      pokemon: "",
      err:""
    }
  }

  // componentDidMount render เสร็จ หลัง render จะไปเรียกใช้ ฟังชั้น getPokemon
  componentDidMount(){
    this.getPokemon(this.state.query);
  }

  getPokemon = async () =>{
    try{

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.query.toLowerCase()}`);
      const data = await res.json();
      console.log(data);

      this.setState({
        pokemon: data,
        err: null
      })


    } catch (err){
      this.setState({
        pokemon: null,
        err
      })

      console.log(err)

    }
  }

  handleChange = e =>{
    this.setState({ query: e.target.value})
  }
  
  handleSubmit = e =>{
    e.preventDefault();
    this.getPokemon(e.target.value);
  }

  render() {

    let{query, pokemon, err} = this.state;
    console.log(this.state.query);



    return (
      <>
      <div className="main-div">
        <form onSubmit={this.handleSubmit}>
          <h3>Search Pokemon</h3>
          <input type="text" onChange={this.handleChange} value={this.state.query}/>
          <input type="submit" value="Search"/>
        </form>

        {/* ถ้ามีข้อมูล เเละ ไม่มี err */}
        {pokemon && !err ?(
          <div className="pokemon-pic">
          <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} alt={this.state.pokemon.name}/>
          <h2 className="pokemon-name-title">{pokemon.name}</h2>
          <ul>
            <li>Base experience : {pokemon.base_experience}</li>
            <li>Weight : {pokemon.weight}</li>
            {pokemon.abilities.map((abil) =>(
              <li>
                {abil.ability.name}
              </li>
            ))}
          </ul>
        </div>

        ): (
          <div className="error">
          <img className="img-error" src="https://i.pinimg.com/originals/13/9a/19/139a190b930b8efdecfdd5445cae7754.png" alt=""/>
          <h2>Whoops ! Couldn't find that Pokemon!</h2>
        </div>
        )}
        

        
     
      </div>
    </>
    )
  }
}





