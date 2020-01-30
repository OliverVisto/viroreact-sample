'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroMaterials
} from 'react-viro';

const merc = require('mercator-projection')
//long and latitute of POI
const LONG = 123.866345
const LAT = 9.676053

export default class FirstLocation extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      x: "",
      y: "",
      posX: 0,
      posY: 0,
      // northPointX: 0,
      // northPointZ: 0,
      // southPointX: 0,
      // southPointZ: 0,
      // eastPointX: 0,
      // eastPointZ: 0,
      // westPointX: 0,
      // westPointZ: 0,
    };
    
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this.convertLatLongToMerc = this.convertLatLongToMerc.bind(this)
    // this._latLongToMerc = this._latLongToMerc.bind(this);
    // this._transformPointToAR = this._transformPointToAR.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .1]} position={[0, 0, -1]} style={styles.helloWorldTextStyle}/>
        {/* <ViroText text={this.state.text} scale={[.2,2,.2]} position={[0, -2, -5]} style={styles.helloWorldTextStyle} /> */}
        {/* <ViroText text="North Text" scale={[3, 3, 3]} transformBehaviors={["billboard"]} position={[0, 0, -5]} style={styles.helloWorldTextStyle} />
        <ViroText text="South Text" scale={[3, 3, 3]} transformBehaviors={["billboard"]} position={[0, 0, 5]} style={styles.helloWorldTextStyle} />
        <ViroText text="West Text" scale={[3, 3, 3]} transformBehaviors={["billboard"]} position={[-5, 0, 0]} style={styles.helloWorldTextStyle} />
        <ViroText text="East Text" scale={[3, 3, 3]} transformBehaviors={["billboard"]} position={[5, 0, 0]} style={styles.helloWorldTextStyle} /> */}
        <ViroText text={this.state.x} scale={[.3, .3, .1]} position={[0, .3, -1]} />
        <ViroText text={this.state.y} scale={[.3, .3, .1]} position={[0, .1, -1]} />
        <ViroBox position={[this.state.posX, 0, this.state.posY]} scale={[.8, .8, .8]}  materials={["grid"]}/>
      </ViroARScene>
    );
  }

  _onInitialized() {
    // var northPoint = this._transformPointToAR(9.676064, 123.866346);
    // var eastPoint = this._transformPointToAR(9.676064, 123.866346);
    // var westPoint = this._transformPointToAR(9.676064, 123.866346);
    // var southPoint = this._transformPointToAR(9.676064, 123.866346);
    // console.log("obj north final x:" + northPoint.x + "final z:" + northPoint.z);
    // console.log("obj south final x:" + southPoint.x + "final z:" + southPoint.z);
    // console.log("obj east point x" + eastPoint.x + "final z" + eastPoint.z);
    // console.log("obj west point x" + westPoint.x + "final z" + westPoint.z);
    // this.setState({
    //   northPointX: northPoint.x,
    //   northPointZ: northPoint.z,
    //   southPointX: southPoint.x,
    //   southPointZ: southPoint.z,
    //   eastPointX: eastPoint.x,
    //   eastPointZ: eastPoint.z,
    //   westPointX: westPoint.x,
    //   westPointZ: westPoint.z,
    //   text : "AR Init called."
    // });
    this.convertLatLongToMerc()
  }

  convertLatLongToMerc(){
    const coord = {
      lat: LAT,
      lng: LONG
    }
    let xy = merc.fromLatLngToPoint(coord)
    this.setState({
      ...this.state,
      x: xy.x.toString(),
      y: xy.y.toString()
    });
    this.convertDegToRad(xy)
  }

  convertDegToRad(mercVal){
    let lat_rad = (mercVal.x / 180.0 * Math.PI)
    let long_rad = (mercVal.y / 180.0 * Math.PI)
    this.setState({
      ...this.state,
      posX: lat_rad,
      posY: long_rad,
      text: "Box?"
    })
  }

  // _latLongToMerc(lat_deg, lon_deg) {
  //   var lon_rad = (lon_deg / 180.0 * Math.PI)
  //   var lat_rad = (lat_deg / 180.0 * Math.PI)
  //   var sm_a = 6378137.0
  //   var xmeters  = sm_a * lon_rad
  //   var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
  //   return ({x:xmeters, y:ymeters});
  // }

  // _transformPointToAR(lat, long) {
  //   var objPoint = this._latLongToMerc(lat, long);
  //   var devicePoint = this._latLongToMerc(9.3, 123.3);
  //   console.log("objPointZ: " + objPoint.y + ", objPointX: " + objPoint.x)
  //   // latitude(north,south) maps to the z axis in AR
  //   // longitude(east, west) maps to the x axis in AR
  //   var objFinalPosZ = objPoint.y - devicePoint.y;
  //   var objFinalPosX = objPoint.x - devicePoint.x;
  //   //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
  //   return ({x:objFinalPosX, z:objFinalPosZ});
  // }

}

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});


var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: 'red',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = FirstLocation;
