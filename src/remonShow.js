import style from './RemonShow.css';
import Remon from '@remotemonster/sdk';
import body from './body';

class RemonShow extends HTMLElement {
  constructor() {
    super();
    this.listener= undefined;
    this.player;
    this.video;
    this.videoInputListButton;
    this.audioInputListButton;
    this.settingButton;
    this.toggle;
    this.codecSelector;
    this.fpsSelector;
    this.resolutionSelector;
    this.fullscreen;
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
  async updateInput(item){
    this.player.querySelectorAll(`.${item.deviceKind.substring(0,5)}-input-list-item`).forEach(function(node){
      if(item.id !== node.id){node.style.background = "rgba(0,0,0,0.5)"}
    })
    item.style.background = "#007bff";
  }
  async domLoaded(){
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
            this.updateInput(e.target);
          }
        }
        this.player.querySelector('.video-input-list').appendChild(div);
      } else if (device.kind === "audioinput") {
        div.className = "audio-input-list-item"
        div.onclick = (e)=>{
          if(this.remon){
            this.remon.setAudioDevice(device.deviceId);
          }else{
            this.config.media.audio.deviceId= device.deviceId;
            this.updateInput(e.target);
          }
        }
        this.player.querySelector('.audio-input-list').appendChild(div);
      }
    }
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
        remote: '#remoteVideo',
        local: '#localVideo'
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

    this.player=  document.querySelector('.player');
    this.video=  this.player.querySelector('.viewer');
    this.video.poster= this.poster? this.poster:null;
    this.videoInputListButton = this.player.querySelector('.video-input-list-button');
    this.audioInputListButton = this.player.querySelector('.audio-input-list-button');
    this.settingButton = this.player.querySelector('.setting-button');
    this.toggle=  this.player.querySelector('.toggle');
    this.codecSelector= this.player.querySelector('.codec-input-selector');
    this.fpsSelector= this.player.querySelector('.fps-input-selector');
    this.resolutionSelector= this.player.querySelector('.resolution-input-selector');
    this.fullscreen=  this.player.querySelector('.fullscreen-btn');

    let that = this;
    this.resolutionSelector.addEventListener('change',function(e){that._changeResolution(that)});
    this.fpsSelector.addEventListener('change', function(e){that._changeFrameRate(that)});
    this.codecSelector.addEventListener('change', function(e){that._changeCodec(that)});
    this.video.addEventListener('click', function(e){that._screenClick(that)});
    this.toggle.addEventListener('click', function(e){that._togglePlay(that)});
    this.fullscreen.addEventListener('click', function(e){that._toggleFullscreen(that)});
    this.videoInputListButton.addEventListener('click', function(e){that._showList(that, '.video-input-list')});
    this.audioInputListButton.addEventListener('click', function(e){that._showList(this, '.audio-input-list')});
    this.settingButton.addEventListener('click', function(e){that._showList(that, '.setting-list')});
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