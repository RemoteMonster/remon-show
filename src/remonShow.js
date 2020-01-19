import style from './RemonShow.css';
import Remon from '@remotemonster/sdk';
import castBody from './castBody';

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
    this.screenStream;

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
    devices.filter(d => !['communications', 'default'].includes(d.deviceId)).map(device => {
      let div = document.createElement('div');
      div.deviceKind = device.kind;
      div.devId = device.deviceId;
      div.innerText = device.label;

      if (device.kind === "videoinput") {
        div.className = "video-input-list-item";
        div.onclick = async (e)=>{
          if(this.remon){
            this.remon.setVideoDevice(device.deviceId);
          }else{
            this.config.media.video.deviceId= device.deviceId;
            this.updateInputElementStyle(e.target);
            this.video.srcObject= await navigator.mediaDevices.getUserMedia(
              {audio:true, video:{deviceId:device.deviceId}}
            );
            this.screenStream= undefined;
          }
          div.parentElement.parentElement.parentElement.style.display="none";
        }
        this.ctrl('.video-input-list').appendChild(div);
      } else if (device.kind === "audioinput") {
        div.className = "audio-input-list-item";
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
      }
    });
  }
  async domLoaded(){
    console.log("리모트몬스터 Simple Broadcast web studio");
    this.updateDevices();
  }
  async connectedCallback() {
    // Dom 에 추가 된 후 
    const remonCast = document.querySelector('remon-cast');
    remonCast.innerHTML = castBody;

    this.config = {
      credential: {
        key: remonCast.getAttribute("key")?remonCast.getAttribute("key"):'1234567890',
        serviceId: remonCast.getAttribute("serviceId")?remonCast.getAttribute("serviceId"):'SERVICEID1'
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
    this.parsingAttr(remonCast);
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
    this.ctrl('.screenCapture-button').onclick = ()=> this._screenCapture();
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
  _toggleFullscreen(){
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
  _screenClick(){
    const method = this.video.paused ? 'play' : 'pause';
    this.video[method]();
  }
  async _screenCapture(){
    if(this.remon){
      this.remon.captureScreen();
    }else{
      this.screenStream= await navigator.mediaDevices.getDisplayMedia(this.config.media);
      this.config.view.localStream= this.screenStream;
      this.video.srcObject= this.screenStream;
    }
  }
  _togglePlay(){
    const toggle= this.ctrl('.toggle');
    if(toggle.firstChild.nodeValue !== "▶"){
      toggle.firstChild.nodeValue = "▶";
      this.remon.close();
      // this.ctrl('.codecSelector').disabled =false;
      // this.ctrl('.fpsSelector').disabled =false;
      // this.ctrl('.resolutionSelector').disabled =false;
    }else{
      toggle.firstChild.nodeValue = "⏹"
      this.remon = new Remon({config:this.config, listener:this.listener});
      this.remon.createCast(this.channelId?this.channelId:undefined);
      // this.ctrl('.codecSelector').disabled =true;
      // this.ctrl('.fpsSelector').disabled =true;
      // this.ctrl('.resolutionSelector').disabled =true;
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
customElements.define('remon-cast', RemonShow);