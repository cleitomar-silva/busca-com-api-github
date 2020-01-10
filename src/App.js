import React, {useState, useEffect} from 'react';
import { Form, Card, Image, Icon } from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [urlUser, setUrlUser] = useState('');
  const [userName, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [reposUrl, setReposUrl] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const [biography, setBiography] = useState('');
  const [local, setLocal] = useState('');

  useEffect(() => {
      fetch('https://api.github.com/users/cleitomar-silva')
        .then(res => res.json())
        .then(data => {
          setData(data);
          console.log(data);
        });
    },[] )

  const setData = ({ 
    name, 
    login, 
    followers, 
    following, 
    public_repos, 
    avatar_url,
    repos_url,
    html_url,
    bio,
    location  
  }) => {
    setName(name);
    setUsername(login);
    setUrlUser(html_url);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setReposUrl(repos_url);
    setBiography(bio);
    setLocal(location)
  };

  const handleSearch = (e) =>{
    setUserInput(e.target.value)
  }

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json() )
      .then(data => {
        if(data.message) {
          setError(data.message);
        } else {
          setData(data);
        }
        
      })
  }

  return (
    <div>     
      <div className="navbar">Busca no Github</div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input placeholder="Github Usuário" name="github" onChange={handleSearch}/>
            <Form.Button  content="Pesquisar" />
            
          </Form.Group>
        </Form>
      </div>
      <div className="card">
        <Card>
          <Image src={avatar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Header>
              <a href={urlUser}>
              {userName}
              </a>                            
            </Card.Header>
                       
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {followers} Seguidores
            </a>
          </Card.Content>
          <Card.Content extra>
            <a href={reposUrl}>
              <Icon name='folder open' />
              {repos} Repositório
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='map marker alternate' />
              {local} - Localização
            </a>
          </Card.Content>
          
          
          <Card.Content extra>
          <Icon name='write square'/>Biografia
            <Card.Description>
              {biography ? (<div>{biography}</div>) : ('nehuma descrição')}
            </Card.Description>             
          </Card.Content>
        </Card>
      </div>
      
    </div>
  );
}

export default App;
