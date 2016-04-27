/*jshint esversion: 6 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: 'MaryOleksiuk',
      userData: [],
      userRepos: [],
      perPage: 10
    };
  }

  //get User Data from Github
  getUserData(){
    $.ajax({
      url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({
          userData: data
        });
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({
          username: null
        });
        alert(err);
      }.bind(this)
    });
  }

  //get User Repos from Github
  getUserRepos(){
    $.ajax({
      url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({
          userRepos: data
        });
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({
          username: null
        });
        alert(err);
      }.bind(this)
    });
  }

  handleFormSubmit(username){
    this.setState({username: username}, function(){
      this.getUserData();
      this.getUserRepos();
    });
  }

  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }

  render(){
    return(
      <div>
        <Search onFormSubmit={this.handleFormSubmit.bind(this)} />
        <Profile {...this.state} />
      </div>
    )
  }
}

App.propTypes = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string
};

App.defaultProps = {
  clientId: 'd6c5063fc7f6c1bbd20e',
  clientSecret: 'ec76538ddfc425de0eab71e0480cd94e4a975f19'
};

export default App
