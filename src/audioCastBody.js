const body = `<div class="player" style="background:rgb(155, 168, 172);">

<canvas class="visualizer viewer"></canvas> 
<div class="player__controls">
    <button class="player__button toggle" title="Toggle Play"><i class="fas fa-play fa-1x"></i></button>
    <div class = "voice-input-list-group" >
        <button class="player__button voice-input-list-button" title="voice Input"><i class="fas fa-cat fa-1x"></i>
        </button>
        <div class="voice-input-list" style = "height: auto; overflow-y: hidden;">
            <div class="voice-input-list-item" id="anonymous"><i class="fas fa-theater-masks"></i>anonymous</div>
            <div class="voice-input-list-item" id="troll"><i class="fab fa-optin-monster"></i>troll</div>
            <div class="voice-input-list-item" id="robot"><i class="fas fa-robot"></i>robot</div>
        </div>
    </div>

    <div class = "audio-input-list-group" >
        <button class="player__button audio-input-list-button" title="Audio Input"><i class="fas fa-music"></i>
        </button>
        <div class="audio-input-list" style = "height: auto; overflow-y: hidden;">
            <div class="audio-input-list-item" id="DBGT01"><i class="fas fa-guitar"></i>DBGT01-DanDan</div>
        </div>
    </div>
    <div class = "subtitle">
        <button class="player__button subtitle-button" title="subtitle"><i class="far fa-closed-captioning"></i></button>

    </div>
    
    <!-- <div class = "setting-groups">
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
        
    </div> -->
    
    <button class="player__button fullscreen-btn"><i class="fas fa-compress fa-1x"></i></i></button>
</div>
</div>`


export default body;