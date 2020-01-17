const body = `
<div class="player" style="background:gray;">
  <video id = "localVideo" class="player__video viewer" autoplay ></video>
  <div class="player__controls">
    <button class="player__button toggle" title="Toggle Play">▶</button>
    <div class = "video-input-list-group" >
        <button class="player__button video-input-list-button" title="Video Input">🎥
        </button>
        <div class="video-input-list" style = "height: auto; overflow-y: hidden;">
        </div>
    </div>

    <div class = "audio-input-list-group" >
        <button class="player__button audio-input-list-button" title="Audio Input">🎤
        </button>
        <div class="audio-input-list" style = "height: auto; overflow-y: hidden;">
        </div>
    </div>
    <div class = "setting-groups">
        <button class="player__button setting-button" title="setting">⚙
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
export default body;