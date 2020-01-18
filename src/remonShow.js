import style from './RemonShow.css';
import Remon from '@remotemonster/sdk';
import body from './body';

class RemonShow extends HTMLElement {
  constructor() {
    super();
    this.listener= undefined;
    this.player;
    this.video;
    this.remon;
    this.config;
    this.channelId;
    this.poster;

    this.domLoaded= this.domLoaded.bind(this);
    this.parsingAttr= this.parsingAttr.bind(this);
    // this.funcs= [this.domLoaded, this.parsingAttr, this._togglePlay, this._screenClick, this._toggleFullscreen,
    //   this._showList, this._changeCodec, this._changeFrameRate, this._changeResolution];
    // this.funcs.map( fun => {
    //     fun= fun.bind(this)
    //   });
    
  }
  parsingAttr(remonShow){
    this.channelId= remonShow.getAttribute('channelId');
    if (remonShow.getAttribute("listener")){
      this.listener= eval(remonShow.getAttribute("listener"));
    }else{
      this.listener = {
        onCreateChannel(chid) {
          console.log(`EVENT FIRED: onConnect: ${chid}`);
        }
      };
    }
    this.poster= (remonShow.getAttribute('poster'))? remonShow.getAttribute('poster'):null;
  }
  updateInputElementStyle(item){
    this.player.querySelectorAll(`.${item.deviceKind.substring(0,5)}-input-list-item`).forEach(function(node){
      if(item.id !== node.id){node.style.background = "rgba(0,0,0,0.5)"}
    })
    item.style.background = "#007bff";
  }
  async updateDevices(){
    let element= this.ctrl('.video-input-list');
    while(element && element.firstChild) element.removeChild(element.firstChild);
    element= this.ctrl('.audio-input-list');
    while(element && element.firstChild) element.removeChild(element.firstChild);

    let devices = await navigator.mediaDevices.enumerateDevices();
    devices.map(device => {
      let div = document.createElement('div');
      div.deviceKind = device.kind;
      div.devId = device.deviceId;
      div.innerText = device.label;

      if (device.kind === "videoinput") {
        div.className = "video-input-list-item";
        div.onclick = (e)=>{
          if(this.remon){
            this.remon.setVideoDevice(device.deviceId);
          }else{
            this.config.media.video.deviceId= device.deviceId;
            this.updateInputElementStyle(e.target);
          }
          div.parentElement.parentElement.parentElement.style.display="none";
        }
        this.ctrl('.video-input-list').appendChild(div);
      } else if (device.kind === "audioinput") {
        div.className = "audio-input-list-item";
        console.log(111);
        div.onclick = (e)=>{
          if(this.remon){
            this.remon.setAudioDevice(device.deviceId);
          }else{
            this.config.media.audio.deviceId= device.deviceId;
            this.updateInputElementStyle(e.target);
          }
          div.parentElement.parentElement.parentElement.style.display="none";
        }
        
        this.ctrl('.audio-input-list').appendChild(div);
        console.log (this.ctrl('.audio-input-list'));
      }
    });
  }
  async domLoaded(){
    console.log("리모트몬스터");
    this.updateDevices();
  }
  async connectedCallback() {
    // Dom 에 추가 된 후 
    const remonShow = document.querySelector('remon-show');
    remonShow.innerHTML = body;

    this.config = {
      credential: {
        key: remonShow.getAttribute("key")?remonShow.getAttribute("key"):'1234567890',
        serviceId: remonShow.getAttribute("serviceId")?remonShow.getAttribute("serviceId"):'SERVICEID1'
      },
      view: {local: '#localVideo'},
      media: {
        audio: {sampleSize: 8, 
          echoCancellation:false, 
          channelCount:2,
          autoGainControl: false,
          noiseSuppression: false
          },
        video: {codec:'H264'}
      }
    };
    this.parsingAttr(remonShow);
    window.addEventListener('DOMContentLoaded', this.domLoaded);

    this.player= document.querySelector('.player');
    this.video= this.ctrl('.viewer');
    this.video.poster= this.poster? this.poster:null;
    this._prepareControlAction();
  }
  _prepareControlAction(){
    this.ctrl('.video-input-list-button').onclick = ()=> {
      document.getElementById("videoInput-modal").style.display="block";
    }
    Array.prototype.filter.call(document.getElementsByClassName("close"), (el)=>{
      el.onclick= () => el.parentElement.style.display="none";
    });
    this.ctrl('.audio-input-list-button').onclick = ()=> {
      document.getElementById("audioInput-modal").style.display="block";
    }
    this.ctrl('.setting-button').onclick = ()=> {
      document.getElementById("setting-modal").style.display="block";
    }
    this.ctrl('.toggle').onclick = ()=> this._togglePlay();
    this.ctrl('.codec-input-selector').onclick = ()=> this._changeCodec();
    this.video.onclick = ()=>{this._screenClick()};
    this.ctrl('.fps-input-selector').addEventListener('change', ()=> this._changeFrameRate());
    this.ctrl('.resolution-input-selector').onchange = ()=> this._changeResolution();
    this.ctrl('.fullscreen-button').onclick = ()=> this._toggleFullscreen();
  }
  ctrl(className){
    return this.player.querySelector(className);
  }
  _changeResolution(){
    let resolution = this.resolutionSelector.options[this.resolutionSelector.selectedIndex].value.split('x')
    this.config.media.video.width =  {min :resolution[0]};
    this.config.media.video.height = {min : resolution[1]};
  }
  _changeFrameRate(){
    this.config.media.video.frameRate = {min:this.fpsSelector.options[this.fpsSelector.selectedIndex].value};
  }
  _changeCodec(){
    this.config.media.video.codec = this.codecSelector.options[this.codecSelector.selectedIndex].value;
  }
  _showList(styleClass){
    let displayStyle = this.player.querySelector(styleClass).style.display;
    displayStyle = (!displayStyle || displayStyle === 'none')? "inline":"";
  }
  _toggleFullscreen() {
    if (!this.player.fullscreenElement && this.player.requestFullscreen) {
      this.player.requestFullscreen();
    } else if (!this.player.mozRequestFullScreen && this.player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    } else if (!this.player.webkitRequestFullscreen && this.player.webkitRequestFullscreen) {
      this.player.webkitRequestFullscreen();
    } else if(!this.player.msRequestFullscreen && this.player.msRequestFullscreen){
      this.player.msRequestFullscreen();
    }
  }
  _screenClick() {
    const method = this.video.paused ? 'play' : 'pause';
    this.video[method]();
  }
  _togglePlay() {
    const toggle= this.ctrl('.toggle');
    if(toggle.firstChild.nodeValue !== "▶"){
      toggle.firstChild.nodeValue = "▶";
      this.remon.close();
      this.ctrl('.codecSelector').disabled =false;
      this.ctrl('.fpsSelector').disabled =false;
      this.ctrl('.resolutionSelector').disabled =false;
    }else{
      toggle.firstChild.nodeValue = "⏹"
      this.remon = new Remon({config:this.config, listener:this.listener});
      this.remon.createCast(this.channelId?this.channelId:undefined);
      this.ctrl('.codecSelector').disabled =true;
      this.ctrl('.fpsSelector').disabled =true;
      this.ctrl('.resolutionSelector').disabled =true;
    }
  }
}
function isInspectOpen()
{
  console.log('a')
    console.profile(); 
    console.profileEnd(); 
    if (console.clear) console.clear();
    return console.profiles.length > 0;
}
customElements.define('remon-show', RemonShow);