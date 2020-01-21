import style from './RemonShow.css';
import Remon from '@remotemonster/sdk';
import castBody from './castBody';
import statBody from './statBody';

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
    this.localStream;

    this.oldLocalABSent=0;
    this.oldLocalVBSent=0;

    this.domLoaded= this.domLoaded.bind(this);
    this.parsingAttr= this.parsingAttr.bind(this);
    this.onStat= this.onStat.bind(this);
    this.onAddRemoteStream= this.onAddRemoteStream.bind(this);
    this.updateDevices= this.updateDevices.bind(this);
  }
  parsingAttr(remonShow){
    this.channelId= remonShow.getAttribute('channelId');
    if (remonShow.getAttribute("listener")){
      this.listener= eval(remonShow.getAttribute("listener"));
    }
    this.listener.onStat = this.onStat;
    this.listener.onAddRemoteStream= this.onAddRemoteStream;
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
            this.config.view.localStream= this.video.srcObject;
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
    navigator.mediaDevices.ondevicechange= (e) => this.updateDevices();
    this.updateDevices();
  }
  async connectedCallback() {
    const remonShow = document.querySelector('remon-cast');
    this.remonShow= remonShow;
    remonShow.innerHTML = castBody;

    this.config = {
      credential: {
        key: remonShow.getAttribute("key")?remonShow.getAttribute("key"):'1234567890',
        serviceId: remonShow.getAttribute("serviceId")?remonShow.getAttribute("serviceId"):'SERVICEID1'
      },
      view: {local: '#localVideo'},
      media: {
        audio: {sampleSize: 8, 
          echoCancellation:false, channelCount:2,
          autoGainControl: false, noiseSuppression: false
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
  onAddRemoteStream(stream){
    this.channelId= this.remon.getChannelId();
    this.toast(`방송이 시작되었습니다. 방의 ID는 ${this.channelId} 입니다`);
    this.setChannelInfo(`Channel: ${this.channelId}`);
  }
  onStat(stats){
    stats.ABSent= (stats.nowLocalABSent-this.oldLocalABSent)/5;
    stats.VBSent= (stats.nowLocalVBSent-this.oldLocalVBSent)/5;
    stats.localAudioLevel= Math.round(stats.localAudioLevel*100);
    this.ctrl('.stat-box').innerHTML= statBody(stats);
    this.oldLocalABSent= stats.nowLocalABSent;
    this.oldLocalVBSent= stats.nowLocalVBSent;
  }
  _prepareControlAction(){
    this.ctrl('.video-input-list-button').onclick = ()=> this._modalToggle('videoInput-modal');
    this.ctrl('.quality-button').onclick = ()=> this._modalToggle('quality-modal');
    Array.prototype.filter.call(document.getElementsByClassName('close'), (el)=>{
      el.onclick= () => el.parentElement.style.display='none';
    });
    this.ctrl('.audio-input-list-button').onclick = ()=> this._modalToggle("audioInput-modal");
    this.ctrl('.setting-button').onclick = ()=> this._modalToggle('setting-modal');
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
  _modalToggle(id){
    const element= document.getElementById(id).style;
    element.display= (element.display==='block')?'none':'block';
  }
  _changeResolution(){
    let resolution = this.ctrl('.resolution-input-selector').
      options[this.ctrl('.resolution-input-selector').selectedIndex].value.split('x')
    this.config.media.video.width =  {min :resolution[0], max: resolution[0]};
    this.config.media.video.height = {min : resolution[1], max: resolution[1]};
  }
  _changeFrameRate(){
    this.config.media.video.frameRate = {
      min:this.ctrl('.fps-input-selector').options[this.ctrl('.fps-input-selector').selectedIndex].value,
      max:this.ctrl('.fps-input-selector').options[this.ctrl('.fps-input-selector').selectedIndex].value};
  }
  _changeCodec(){
    this.config.media.video.codec = this.ctrl('.codec-input-selector').
      options[this.ctrl('.codec-input-selector').selectedIndex].value;
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
    // const method = this.video.paused ? 'play' : 'pause';
    // this.video[method]();
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
      this.setChannelInfo('');
      this.remon= null;
    }else{
      toggle.firstChild.nodeValue = "■"
      this.remon = new Remon({config:this.config, listener:this.listener});
      this.channelId= this.remonShow.getAttribute("channelId");
      this.remon.createCast(this.channelId?this.channelId:undefined);
    }
  }
  setChannelInfo(info){
    document.getElementById("channelInfoBar").innerHTML= info;
  }
  toast(string) {
    let removeToast;
    const toast = document.getElementById("toast");
    toast.classList.contains("reveal") ?
      (clearTimeout(removeToast), removeToast = setTimeout(function () {
          document.getElementById("toast").classList.remove("reveal")
      }, 3000)) :
      removeToast = setTimeout(function () {
          document.getElementById("toast").classList.remove("reveal")
      }, 3000)
    toast.classList.add("reveal");
    toast.innerText = string
  }
}
customElements.define('remon-cast', RemonShow);