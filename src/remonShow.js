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
  async updateInputElementStyle(item){
    this.player.querySelectorAll(`.${item.deviceKind.substring(0,5)}-input-list-item`).forEach(function(node){
      if(item.id !== node.id){node.style.background = "rgba(0,0,0,0.5)"}
    })
    item.style.background = "#007bff";
  }
  async updateDevices(){
    let element= _control('.video-input-list');
    while(element && element.firstChild) element.removeChild(element.firstChild);
    element= _control('.audio-input-list');
    while(element && element.firstChild) element.removeChild(element.firstChild);

    let devices = await navigator.mediaDevices.enumerateDevices();
    for (let i = 0; i < devices.length; i++) {
      let device = devices[i];
      let div = document.createElement('div');
      div.deviceKind = device.kind;
      div.id = device.deviceId;
      div.innerText = device.label;

      if (device.kind === "videoinput") {
        div.className = "video-input-list-item"
        div.onclick = (e)=>{
          if(this.remon){
            this.remon.setVideoDevice(device.deviceId);
          }else{
            this.config.media.video.deviceId= device.deviceId;
            this.updateInputElementStyle(e.target);
          }
        }
        _control('.video-input-list').appendChild(div);
      } else if (device.kind === "audioinput") {
        div.className = "audio-input-list-item"
        div.onclick = (e)=>{
          if(this.remon){
            this.remon.setAudioDevice(device.deviceId);
          }else{
            this.config.media.audio.deviceId= device.deviceId;
            this.updateInputElementStyle(e.target);
          }
        }
        _control('.audio-input-list').appendChild(div);
      }
    }
  }
  async domLoaded(){
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
      view: {
        remote: '#remoteVideo', local: '#localVideo'
      },
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
    this.video= _control('.viewer');
    this.video.poster= this.poster? this.poster:null;
    this._prepareControlAction();
  }
  _prepareControlAction(){
    _control('.video-input-list-button').
      addEventListener('click', ()=> this._showList(this, '.video-input-list'));
    _control('.audio-input-list-button').
      addEventListener('click', ()=> this._showList(this, '.audio-input-list'));
    _control('.setting-button').
      addEventListener('click', ()=> this._showList(this, '.setting-list'));
    _control('.toggle').addEventListener('click', ()=> this._togglePlay(this));
    _control('.codec-input-selector').
      addEventListener('change', ()=> this._changeCodec(this));
    this.video.addEventListener('click', ()=>{this._screenClick(this)});
    _control('.fps-input-selector').addEventListener('change', ()=> this._changeFrameRate(this));
    _control('.resolution-input-selector').
      addEventListener('change', ()=> this._changeResolution(this));
    _control('.fullscreen-btn').addEventListener('click', ()=> this._toggleFullscreen(this));
  }
  _control(className){
    return this.player.querySelector(className);
  }
  _changeResolution(T){
    let resolution = T.resolutionSelector.options[T.resolutionSelector.selectedIndex].value.split('x')
    T.config.media.video.width =  {min :resolution[0]};
    T.config.media.video.height = {min : resolution[1]};
  }
  _changeFrameRate(T){
    T.config.media.video.frameRate = {min:T.fpsSelector.options[T.fpsSelector.selectedIndex].value};
  }
  _changeCodec(T){
    T.config.media.video.codec = T.codecSelector.options[T.codecSelector.selectedIndex].value;
  }
  _showList(T, styleClass){
    let displayStyle = T.player.querySelector(styleClass).style.display;
    displayStyle = (!displayStyle || displayStyle === 'none')? "inline":"";
  }
  _toggleFullscreen(T) {
    if (!T.player.fullscreenElement && T.player.requestFullscreen) {
      T.player.requestFullscreen();
    } else if (!T.player.mozRequestFullScreen && T.player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    } else if (!T.player.webkitRequestFullscreen && T.player.webkitRequestFullscreen) {
      T.player.webkitRequestFullscreen();
    } else if(!T.player.msRequestFullscreen && T.player.msRequestFullscreen){
      T.player.msRequestFullscreen();
    }
  }
  _screenClick(T) {
    const method = T.video.paused ? 'play' : 'pause';
    T.video[method]();
  }
  _togglePlay(T) {
    if(T.toggle.firstChild.nodeValue !== "▶"){
      T.toggle.firstChild.nodeValue = "▶";
      T.remon.close();
      T.codecSelector.disabled =false;
      T.fpsSelector.disabled =false;
      T.resolutionSelector.disabled =false;
    }else{
      T.toggle.firstChild.nodeValue = "⏹"
      T.remon = new Remon({config:T.config, listener:T.listener});
      T.remon.createCast(T.channelId?T.channelId:undefined);
      T.codecSelector.disabled =true;
      T.fpsSelector.disabled =true;
      T.resolutionSelector.disabled =true;
    }
  }
}
customElements.define('remon-show', RemonShow);