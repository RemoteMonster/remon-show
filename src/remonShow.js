class remonShow extends HTMLElement {
    constructor() {
        // 클래스 초기화.
        super();
    }
    async connectedCallback() {
        // Dom 에 추가 된 후 
        const remonShow = document.querySelector('remon-show');
        remonShow.innerHTML = `
            <div class="player" style="background:gray;">
                <video id = "localVideo" class="player__video viewer" autoplay ></video>
                <div class="player__controls">
                    <button class="player__button toggle" title="Toggle Play"><i class="fas fa-play fa-1x"></i></button>
                    <div class = "video-input-list-group" >
                        <button class="player__button video-input-list-button" title="Video Input"><i class="fas fa-video fa-1x"></i>
                        </button>
                        <div class="video-input-list" style = "height: auto; overflow-y: hidden;">
                        </div>
                    </div>

                    <div class = "audio-input-list-group" >
                        <button class="player__button audio-input-list-button" title="Audio Input"><i class="fas fa-microphone-alt fa-1x"></i>
                        </button>
                        <div class="audio-input-list" style = "height: auto; overflow-y: hidden;">
                        </div>
                    </div>



                    <div class = "setting-groups">
                        <button class="player__button setting-button" title="setting"><i class="fas fa-cog fa-1x"></i> 
                        </button>
                        <div class = "setting-list">

                            <div class = "codec-input-list">
                                <select class="codec-input-selector" >
                                    <option selected disabled>Codec</option>
                                    <option value="h264">H264</option>
                                    <option value="vp8">VP8</option>
                                    <option value="vp9">VP9</option>
                                </select>
                            </div>

                            <div class = "fps-input-list">
                                <select class="fps-input-selector">
                                    <option selected disabled>FPS</option>
                                    <option value="25">25</option>
                                </select>
                            </div>

                            <div class = "resolution-input-list">
                                <select class="resolution-input-selector">
                                    <option selected disabled>Resolution</option>
                                    <option value="1280x720">1280 x 720</option>
                                </select>
                            </div>

                        </div>
                        
                    </div>
                    
                    <button class="player__button fullscreen-btn"><i class="fas fa-compress fa-1x"></i></i></button>
                </div>
            </div>
            `

            let remon;
            const config = {
                credential: {
                    key: '1234567890',
                    serviceId: 'SERVICEID1'
                },
                view: {
                    remote: '#remoteVideo',
                    local: '#localVideo'
                },
                media: {
                    audio: true,
                    video: true
                }
            };
            const listener = {
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
                        console.log(selectedVideoTrack.kind + " is changed")
                    }else{
                        console.log("방송중이 아닙니다.")
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
                        console.log(selectedAudioTrack.kind + " is changed")
                    }else{
                        console.log("방송중이 아닙니다.")
                    }
                }
            }





        })

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
            if(toggle.firstChild.className !== "fas fa-play fa-1x"){
                toggle.firstChild.className = "fas fa-play fa-1x";
                remon.close();
            }else{
                toggle.firstChild.className = "fas fa-stop-circle fa-1x"
                remon = new Remon({config, listener});
                remon.createCast('testchannel123');
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

        function showVideoInputList(){
            if(!player.querySelector('.video-input-list').style.display || 
                player.querySelector('.video-input-list').style.display === 'none')
            {
                player.querySelector('.video-input-list').style.display="inline";
            }else{
                player.querySelector('.video-input-list').style.display="";

            }
        }

        function showAudioInputList(){
            if(!player.querySelector('.audio-input-list').style.display || 
                player.querySelector('.audio-input-list').style.display === 'none')
            {
                player.querySelector('.audio-input-list').style.display="inline";
            }else{
                player.querySelector('.audio-input-list').style.display="";

            }
        }

        function showSettingList(){
            if(!player.querySelector('.setting-list').style.display || 
                player.querySelector('.setting-list').style.display === 'none')
            {
                player.querySelector('.setting-list').style.display="inline";
            }else{
                player.querySelector('.setting-list').style.display="";

            }
        }
        function changeCodec(){
            if(typeof config.media.video !== "object"){
                config.media.video =  {codec:codecSelector.options[codecSelector.selectedIndex].value};
            }else{
                config.media.video.codec = codecSelector.options[codecSelector.selectedIndex].value;
            }
        }

        function changeFrameRate(){
            if(typeof config.media.video !== "object"){
                config.media.video =  {frameRate:{ min :fpsSelector.options[fpsSelector.selectedIndex].value}};
            }else{
                config.media.video.frameRate = {min:fpsSelector.options[fpsSelector.selectedIndex].value};
            }
        }
        
        function changeResolution(){
            let resolution = resolutionSelector.options[resolutionSelector.selectedIndex].value.split('x')
            if(typeof config.media.video !== "object"){
                config.media.video =  { width:{ min :resolution[0]},
                                        height:{min:resolution[1]}};
            }else{
                config.media.video.width =  {min :resolution[0]};
                config.media.video.height = {min : resolution[1]};
            }
        }


        resolutionSelector.addEventListener('change',changeResolution);
        fpsSelector.addEventListener('change',changeFrameRate);
        codecSelector.addEventListener('change',changeCodec);
        video.addEventListener('click', screenClick);
        toggle.addEventListener('click', togglePlay);
        fullscreen.addEventListener('click', toggleFullscreen);
        videoInputListButton.addEventListener('click', showVideoInputList)
        audioInputListButton.addEventListener('click', showAudioInputList)
        settingButton.addEventListener('click',showSettingList)
    }
}
// <current-time> 태그가 CurrentTime 클래스를 사용하도록 한다.

customElements.define('remon-show', remonShow);