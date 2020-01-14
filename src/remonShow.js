import style from './RemonShow.css';
import Remon from '@remotemonster/sdk';
import body from './body';

class RemonShow extends HTMLElement {
    constructor() {
        super();
        this.listener= undefined;
    }
    async connectedCallback() {
        // Dom 에 추가 된 후 
        const remonShow = document.querySelector('remon-show');
        let listener= undefined;
        remonShow.innerHTML = body;

        let remon;
        const config = {
            credential: {
                key: remonShow.getAttribute("key")?remonShow.getAttribute("key"):'1234567890',
                serviceId: remonShow.getAttribute("serviceId")?remonShow.getAttribute("serviceId"):'SERVICEID1'
            },
            view: {
                remote: '#remoteVideo',
                local: '#localVideo'
            },
            media: {
                audio: true,
                video: {codec:'H264'}
            }
        };
        if (remonShow.getAttribute("listener")){
            let listenerName= remonShow.getAttribute("listener");
            listener = eval(listenerName);
        }else{
            listener = {
                onCreateChannel(chid) {
                    console.log(`EVENT FIRED: onConnect: ${chid}`);
                },
                onComplete() {
                    console.log('EVENT FIRED: onComplete');
                },
                onDisconnectChannel() {
                    // is called when other peer hang up.
                    console.log("some viewer is exited")
                },
                onClose() {
                    // is called when remon.close() method is called.
                    console.log('EVENT FIRED: onClose');
                },
                onError(error) {
                    console.log(`EVENT FIRED: onError: ${error}`);
                },
                onStat(result) {
                    console.log(`EVENT FIRED: onStat: ${result}`);
                }
            };
        }

        window.addEventListener('DOMContentLoaded', async function(){
            let devices = await navigator.mediaDevices.enumerateDevices();
            for (let i = 0; i < devices.length; i++) {
                let device = devices[i];
                let div = document.createElement('div');
                div.divceKind = device.kind;
                div.id = device.deviceId;
                div.innerText = device.label;

                if (device.kind === "videoinput") {
                    div.className = "video-input-list-item"
                    div.onclick = function(){
                        config.media.video = {deviceId:device.deviceId};
                        updateInput(this);
                    }
                    player.querySelector('.video-input-list').appendChild(div);
                } else if (device.kind === "audioinput") {
                    div.className = "audio-input-list-item"
                    div.onclick = function(){
                        config.media.audio = {deviceId:device.deviceId}
                        updateInput(this);
                    }
                    player.querySelector('.audio-input-list').appendChild(div);
                }
            }

            async function updateInput(item){
                if(item.divceKind==="videoinput"){
                    if(remon.context.peerConnection){
                        player.querySelectorAll('.video-input-list-item').forEach(function(node){
                            if(item.id !== node.id){node.style.background = "rgba(0,0,0,0.5)"}
                         })
                        item.style.background = "#007bff";

                        let selectedVideoStream= await navigator.mediaDevices.getUserMedia(config.media);
                        localVideo.srcObject=selectedVideoStream;
                        localVideo.play();
                        let selectedVideoTrack = selectedVideoStream.getVideoTracks()[0];
                        let sender = remon.context.peerConnection.getSenders().find(function(s) {
                            return s.track.kind == selectedVideoTrack.kind;
                        });
                        sender.replaceTrack(selectedVideoTrack);
                        console.log(selectedVideoTrack.kind + " is changed");
                    }else{
                        console.log("방송중이 아닙니다.");
                    }
                    

                }else if(item.divceKind==="audioinput"){
                     if(remon.context.peerConnection){
                        player.querySelectorAll('.audio-input-list-item').forEach(function(node){
                            if(item.id !== node.id){node.style.background = "rgba(0,0,0,0.5)"}
                         })
                        item.style.background = "#007bff";

                        let selectedAudioStream= await navigator.mediaDevices.getUserMedia(config.media);
                        localVideo.srcObject=selectedAudioStream;
                        localVideo.play();
                        let selectedAudioTrack = selectedAudioStream.getAudioTracks()[0];
                        let sender = remon.context.peerConnection.getSenders().find(function(s) {
                            return s.track.kind == selectedAudioTrack.kind;
                        });
                        sender.replaceTrack(selectedAudioTrack);
                        console.log(selectedAudioTrack.kind + " is changed");
                    }else{
                        console.log("방송중이 아닙니다.");
                    }
                }
            }
        });

        const player       =  document.querySelector('.player');
        const video        =  player.querySelector('.viewer');
        const videoInputListButton = player.querySelector('.video-input-list-button');
        const audioInputListButton = player.querySelector('.audio-input-list-button');
        const settingButton = player.querySelector('.setting-button');
        const toggle       =  player.querySelector('.toggle');
        const codecSelector = player.querySelector('.codec-input-selector');
        const fpsSelector = player.querySelector('.fps-input-selector');
        const resolutionSelector = player.querySelector('.resolution-input-selector');
        const fullscreen   =  player.querySelector('.fullscreen-btn');

        // toggle play/pause
        function screenClick() {
            const method = video.paused ? 'play' : 'pause';
            video[method]();
        }


        // Update button on play/pause
        function togglePlay() {
            if(toggle.firstChild.nodeValue !== "▶"){
                toggle.firstChild.nodeValue = "▶";
                remon.close();
                codecSelector.disabled =false;
                fpsSelector.disabled =false;
                resolutionSelector.disabled =false;
            }else{
                toggle.firstChild.nodeValue = "⏹"
                remon = new Remon({config, listener});
                remon.createCast('testchannel123');
                codecSelector.disabled =true;
                fpsSelector.disabled =true;
                resolutionSelector.disabled =true;
            }
        }

        // Create fullscreen video button
        function toggleFullscreen() {
            if (!player.fullscreenElement && player.requestFullscreen) {
                player.requestFullscreen();
            } else if (!player.mozRequestFullScreen && player.mozRequestFullScreen) {
                player.mozRequestFullScreen();
            } else if (!player.webkitRequestFullscreen && player.webkitRequestFullscreen) {
                player.webkitRequestFullscreen();
            } else if(!player.msRequestFullscreen && player.msRequestFullscreen){
                player.msRequestFullscreen();
            }
        }

        function showList(styleClass){
            let displayStyle = player.querySelector(styleClass).style.display;
            displayStyle = (!displayStyle || displayStyle === 'none')? "inline":"";
        }

        function changeCodec(){
            config.media.video.codec = codecSelector.options[codecSelector.selectedIndex].value;
        }

        function changeFrameRate(){
            config.media.video.frameRate = {min:fpsSelector.options[fpsSelector.selectedIndex].value};
        }
        
        function changeResolution(){
            let resolution = resolutionSelector.options[resolutionSelector.selectedIndex].value.split('x')
            config.media.video.width =  {min :resolution[0]};
            config.media.video.height = {min : resolution[1]};
        }

        resolutionSelector.addEventListener('change',changeResolution);
        fpsSelector.addEventListener('change',changeFrameRate);
        codecSelector.addEventListener('change',changeCodec);
        video.addEventListener('click', screenClick);
        toggle.addEventListener('click', togglePlay);
        fullscreen.addEventListener('click', toggleFullscreen);
        videoInputListButton.addEventListener('click', showList('.video-input-list'));
        audioInputListButton.addEventListener('click', showList('.audio-input-list'));
        settingButton.addEventListener('click',showList('.setting-list'));
    }
}
customElements.define('remon-show', RemonShow);