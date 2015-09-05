'use strict';

var React = require('react-native');
var REQUEST_URL = 'https://incandescent-inferno-4780.firebaseio.com/pond.json';
var userID;

var {
 StyleSheet,
 View,
 Text,
 Component,
 ListView
   } = React;

var styles = require('./styles');

var SearchNav = React.createClass ({

getInitialState() {
  //this will be replaced with a function that gets the facebook id of the user who logs in
  userID = '714387395';
  return {
    selectedTab: 'featured',
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      cloneWithRows: (['row 1', 'row 2'])
    }),
    loaded: false,
    traits : null
  };
},

componentDidMount(){
  this.fetchData();
},

fetchData () {
  return(
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        traits: responseData[userID],
        loaded: true
      })
    })
    .done()
    )
},

render() {
  if (!this.state.loaded) {
    return this.renderLoadingView();
  }
  var traits = this.state.traits;
  return this.renderTraits(traits);
},

renderLoadingView() {
 return (
   <View style={styles.container}>
   <Text>
   Loading traits...
   </Text>
   </View>
   );
},

renderTraits(traitData) {
 var lines = Object.keys(traitData).length;
 var traits = [];
 var vote;
 for(var key in traitData){
  vote = traitData[key].length;
  traits.push(key, vote);
 }
 return (
   <View style={styles.container}>
   <View style={styles.rightContainer}>
   <Text numberOfLines={lines }style={styles.title}> {traits}</Text>
   </View>
   </View>
    )
}
});

module.exports = SearchNav;