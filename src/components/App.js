import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChange = e => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  handleFetch = e =>{
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
      .then(data => data.json())
      .then(json => this.setState({
        pets: json
      }))
    } else {
      fetch(`/api/pets?type=` + this.state.filters.type)
      .then(data => data.json())
      .then(json => this.setState({
        pets: json
      }))
    }
  }

  handleAdoption = id => {
    const pets = this.state.pets.map(p => {
      if (p.id === id) {
        p.isAdopted = true 
        return p
      } else {
        return p
      }
    })
    
    this.setState({
      pets: pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChange} onFindPetsClick={this.handleFetch} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoption} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
