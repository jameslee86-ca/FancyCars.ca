import React, { Component } from 'react';
import {
    AppRegistry,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Text,
    View,
    Image,
    TouchableOpacity,
    Picker, Button, Alert, ____LayoutStyle_Internal as flexDirection,
} from 'react-native';

var carList = [
    {
        id: '1',
        name: 'Explorer',
        make: 'Ford',
        model: 'SUV',
        year: '2019',
        availability: 'In Dealership',
        url: 'https://cn.bing.com/th?id=A090348a1af17a8cbc4022b4c5d5f106f&w=200&h=160&c=7&rs=1&qlt=80&cdv=1&pid=16.1'
    },
    {
        id: '2',
        name: 'Focus',
        make: 'Ford',
        model: 'Sedan',
        year: '2020',
        availability: 'In Dealership',
        url: 'https://cn.bing.com/th?id=AMMS_3d6b83352b928032b0ad685a139775dc&w=168&h=101&c=7&rs=2&qlt=80&cdv=1&pid=16.1'
    },
    {
        id: '3',
        name: 'Edge',
        make: 'Ford',
        model: 'Sedan',
        year: '2018',
        availability: 'In Dealership',
        url: 'https://cn.bing.com/th?id=A58137f22d0b872c339395dd8b2d4db86&w=200&h=160&c=7&rs=1&qlt=80&cdv=1&pid=16.1'
    },
    {
        id: '4',
        name: 'Flex',
        make: 'Ford',
        model: 'Minivan',
        year: '2019',
        availability: 'Out of Stock',
        url: 'https://cn.bing.com/th?id=AMMS_a96ef208bab630f3dc1baab515b3dfaf&w=200&h=160&c=7&rs=1&qlt=80&cdv=1&pid=16.1'
    },
    {
        id: '5',
        name: 'Escape',
        make: 'Ford',
        model: 'SUV',
        year: '2018',
        availability: 'Out of Stock',
        url: 'https://cn.bing.com/th?id=A175c6d1f2d600ed4d4f13b57558bf2b7&w=200&h=160&c=7&rs=1&qlt=80&cdv=1&pid=16.1'
    },
    {
        id: '6',
        name: '535d xDrive',
        make: 'BMW',
        model: 'Sedan',
        year: '2019',
        availability: 'Unavailable',
        url: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3149565853,19878643&fm=85&s=04E67A2341AA2EA62E48F9060100E0C3'
    },
    {
        id: '7',
        name: 'Uplander',
        make: 'Chevron',
        model: 'MINI Van',
        year: '2018',
        availability: 'In Dealership',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Chevrolet_Traverse_3.6_Premier_AWD_2018.jpg/420px-Chevrolet_Traverse_3.6_Premier_AWD_2018.jpg'
    },
    {
        id: '8',
        name: 'Fusion ',
        make: 'Ford',
        model: 'Sedan',
        year: '2019',
        availability: 'In Dealership',
        url: 'https://cn.bing.com/th?id=AMMS_575a17e2b3229e6e64cb3e781e43b000&w=168&h=101&c=7&rs=2&qlt=80&cdv=1&pid=16.1'
    }
]

class Item extends Component {
    render() {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={this.props.press}>
                    <ImageBackground resizeMode="contain" style={styles.img}
                                     source={{uri:this.props.url}}>
                        <Text numberOfLines={1} style={styles.item_text}>{this.props.make}   {this.props.name}  {this.props.year}</Text>
                    </ImageBackground>
                </TouchableOpacity>
                < Text numberOfLines={1} style={styles.item_text2}>{ this.props.model} | {this.props.availability} </Text>
            </View>
        );
    }
}

class List extends Component {
    render() {
        var data = this.props.cars;
        var list = [];
        for(var i in data){
            if(i % 2 === 0){
                var row = (
                    <View key={i} style={styles.row}>
                        <View style={{flex:1}}>
                            <Item
                                url={data[i].url}
                                name={data[i].name}
                                make={data[i].make}
                                model={data[i].model}
                                year={data[i].year}
                                availability={data[i].availability}
                                press={this.press.bind(this, data[i])}></Item>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={this._onPressButton}
                                    title="Buy"
                                    disabled={"In Dealership"!=data[i].availability}
                                />
                            </View>
                        </View>
                        <View style={{flex:1}}>
                            <Item
                                url={data[parseInt(i)+1].url}
                                name={data[parseInt(i)+1].name}
                                make={data[parseInt(i)+1].make}
                                model={data[parseInt(i)+1].model}
                                year={data[i].year}
                                availability={data[parseInt(i)+1].availability}
                                press={this.press.bind(this, data[parseInt(i)+1])}></Item>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={this._onPressButton}
                                    title="Buy"
                                    disabled={"In Dealership"!=data[parseInt(i)+1].availability}
                                />
                            </View>
                        </View>
                    </View>);
                list.push(row);
            }
        }

        return (
            <ScrollView style={{marginTop:10}}>
                {list}
            </ScrollView>
        );
    }
    _onPressButton() {
        Alert.alert('Let me help you on your new car！')
    }

    press(data) {
        if (data.availability=="In Dealership")
            Alert.alert("Good luck! We have " + data.availability + " " +data.name + " in stock to choose");
        else if (data.availability=="Out of Stock")
            Alert.alert("Sorry, " + data.name + " is out of stock temporarily");
        else
            Alert.alert("Sorry, " + data.name + " is currently not available");
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown:'byName',
            ifAvailable: 'In Dealership',
            myCars:carList.sort(valuesort('year', false)),
        };
    }
    render() {
        return (
            <View style={styles.flex}>
                <Picker
                    mode={'dropdown'}
                    style={{width:150}}
                    selectedValue={this.state.dropdown}
                    onValueChange={(value)=>this._onValueChange(value)}>
                    <Picker.Item label="Sort by Name" value="byName" />
                    <Picker.Item label="Sort by Availability" value="byAvailability" />
                    <Picker.Item label="Sort by Maker" value="byMaker" />
                    <Picker.Item label="Sort By Year" value="byYear" />
                </Picker>
                <List cars={this.state.myCars}></List>
            </View>
        );
    }
    _onValueChange = (value) => {
        this.setState({dropdown:value});
        if("byName"==value) {
            this.setState({myCars: carList.sort(valuesort('name', false))});
        } else if("byAvailability"==value){
            this.setState({myCars: carList.sort(valuesort('availability', true))});
        } else if("byMaker"==value){
            this.setState({myCars: carList.sort(valuesort('make', true))});
        } else if("byYear"==value){
            this.setState({myCars: carList.sort(valuesort('year', false))});
        }
    };
    componentDidMount(){
        /*
      this._getCarList();
      var data = this.state.myCars;
      for(var i in data){
          this._ifAvailable(id);
          data[i].availability = this._ifAvailable(i);  // Set the value of availability for every car
      }
      this.setState({myCars: data.sort(valuesort('year', false))});
      */
    }
    _getCarList(){
        return fetch('https://www.welmart.com/REST/cars')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    myCars: responseJson,
                }, function(){
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }
    _ifAvailable(id){
        var myUrl='https://www.welmart.com/REST/availability?id='+id;
        return fetch(myUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    ifAvailable: responseJson,
                }, function(){
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }
}

var valuesort = function (keyName,sortType) {
    return function (objectN, objectM) {
        var valueN = objectN[keyName]
        var valueM = objectM[keyName]
        if (valueN < valueM) return sortType?-1:1
        else if (valueN > valueM) return sortType?1:-1
        else return 0
    }
}
//样式定义
const styles = StyleSheet.create({
    flex:{
        flex:1,
//        alignItems:'flex-end',
    },
    row:{
        flexDirection: 'row',
        marginBottom: 10,
    },
    item:{
        flex:1,
        marginLeft:5,
        borderWidth:1,
        borderColor:'#ddd',
        marginRight:5,
        height:140,
    },
    img:{
        //flex:1,
        backgroundColor: 'transparent'
    },
    item_text:{
        backgroundColor: '#000',
        opacity: 0.7,
        color:'#fff',
        height:15,
        lineHeight:15,
        textAlign:'center',
        marginTop:110
    },
    buttonContainer: {
        margin: 10
    },
    item_text2:{
        backgroundColor: '#000',
        opacity: 0.7,
        color:'#fff',
        height:15,
        lineHeight:15,
        textAlign:'center',
    }
});
// skip this line if using Create React Native App
AppRegistry.registerComponent('MyApp', () => Main);