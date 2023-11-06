import React from 'react';
import './App.css'
import Dies from './components/Dies'
import nanoId from 'nano-id';
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);


  React.useEffect(()=>{
    const isAllHeld = dice.every(die=> die.isHeld);

    const firstValue = dice[0].value;
    const allSameValue = dice.every(die=>die.value === firstValue);

    if(isAllHeld && allSameValue){
      setTenzies(true)
      console.log("You Won!");
    } 
  },[dice])

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoId()
    }
  }

    function allNewDice(){
       const newDice = [];
       for(let i = 0;  i<10; i++){
        newDice.push(
          generateNewDie()
          );

       }
       return newDice;
    }

    function holdDice(id){
        setDice(oldDIce=> oldDIce.map(die=>{
          return die.id === id ? {...die, isHeld : !die.isHeld} : die
        }))

    }

    const diceElements = dice.map(die => <Dies value={die.value} key={die.id} isHeld={die.isHeld} holdDice={()=> holdDice(die.id)}/>)

    

    function roleDice(){
      if(!tenzies){
        setDice(oldDice => oldDice.map(die=>{
          return die.isHeld ? die : generateNewDie()
        }))
      }else{
        setTenzies(false);
        setDice(allNewDice())
      }
      
    }

  return (
   <main >
    {tenzies  && <Confetti/>}
    <h1 className='title'>Tenzies</h1>
    <p className='instructions'>Role untill all dice are the same. Click each die to freex it at its current value between rolls.</p>

    <div className='dies-container'>
      {diceElements}
    </div>

    <button onClick={roleDice} className='role-dice'>{tenzies ? "New Game": "Role"}</button>
   </main>
  )
}

export default App
