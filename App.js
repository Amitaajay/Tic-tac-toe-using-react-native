import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert, TextInput} from 'react-native';
import { render } from 'react-dom';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component  {
  constructor(props){
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }
  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
        
      ],
      currentPlayer: 1,
    });
  }

  getWinner = () => {
    const No_TILES = 3;
    var sum;
    var arr = this.state.gameState;
    //check rows
    for (var i = 0; i<No_TILES; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum==3) { return 1;}
      else if (sum== -3) {return -1;}
    
    }

    //check columns
    for (var i = 0; i<No_TILES; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum==3) { return 1;}
      else if (sum== -3) {return -1;}
    
    }

    //check right diagonal
    sum = arr[0][0]+ arr[1][1] + arr[2][2];
    if(sum==3) {return 1;}
    else if(sum== -3) {return -1;}

    //check left diagonal 
    sum= arr[0][2] + arr[1][1] + arr[2][0];
    if(sum==3) {return 1;}
    else if(sum== -3) {return -1;}

    //No winner
    return 0;

  }

  onTilePress = (row, col) => {

    var value= this.state.gameState[row][col];
    if (value !==0) {return;}

    var currentPlayer = this.state.currentPlayer;

    var arr= this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

  //To choose player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

  //Winner
    var Winner = this.getWinner();
    if (Winner == 1) {
      Alert.alert("Player 1 is the winner");
      this.initializeGame();
    }
    else if (Winner == -1){
      Alert.alert("Player 2 is the winner");
      this.initializeGame();
    }

  }

  onNewGame =() =>{
    this.initializeGame();
  }
  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name="close" style={styles.cross}/>;
      case -1: return <Icon name="circle-outline" style={styles.circle}/>;
      default: return <View />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Tic Tac Toe</Text>
        </View>
        <View style={{margin: 20}}/>
        

        <View style={styles.board}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)}style={styles.tile}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)}style={styles.tile}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)}style={styles.tile}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={styles.board}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)}style={styles.tile}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)}style={styles.tile}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)}style={styles.tile}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={styles.board}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)}style={styles.tile}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>        
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)}style={styles.tile}>
            {this.renderIcon(2, 1)}        
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)}style={styles.tile}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{margin:20}}/>
      
        <Button title= "Restart" onPress={this.onNewGame}/>
        
        
      
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#f0f8ff',
    margin: 10,
  },
  header:
  {
    marginTop: 10,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  board: {
    flexDirection: "row",
    //alignItems: "center",
    //justifyContent: "center",
  },
  tile: {
    borderWidth: 3,
    width: 100,
    height: 100,
  },
  cross:{
    color: 'green',
    fontSize:  100,
   // alignItems: 'center',
  },
  circle: {
    color: '#b22222',
    fontSize:  100,
    //alignItems: 'center',
    
    
  },

  
});
