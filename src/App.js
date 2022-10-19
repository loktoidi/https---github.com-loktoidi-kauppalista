import axios from 'axios';
import { useEffect,useState } from 'react';
import './App.css';

/*github sekoiluja taas */

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [items, setItems] = useState([])
  const[newItem, setNewItem] = useState ('')

  useEffect(() => {
    axios.get(URL)
    .then((response)=> {
      setItems(response.data)
    }).catch (error => {
      console.log(error.response ? error.response.data.error : error)
      alert('Haku ei onnistu');
    })

  },[])

  const save = (e) => {
    e.preventDefault()
    const json = JSON.stringify({description:newItem})
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then ((response) => {
      setItems([...items,response.data])
    }).catch(error => {
      console.log(error.response ? error.response.data.error : error)
      alert('Häiriö')
    })
    
  }
  

  return (
    <div className='container'>
      <form onSubmit={save}>
      <label>Uusi tuote</label>
      <input value={newItem} onChange={e => setNewItem(e.target.value)}/>
      <button>Tallenna</button>
      </form>
      <h3>Minun tuotteet</h3>
      <ol>
        {
          items?.map(item => (
            <li key={item.id}>{item.description}</li>
          ))}
        
        </ol>
    </div>
  );
}

export default App;

