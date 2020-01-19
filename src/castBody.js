const body = `
<div class="player" style="background:gray;">
  <video id = "localVideo" class="viewer" autoplay muted playsinline></video>
  <div class="video-controls">
    <div class="left-controls">
      <button class="video-button toggle" title="Toggle Play">▶</button>
      <div class = "video-input-list-group player_button_group" >
        <button class="video-button video-input-list-button" title="Video Input">🎥
        </button>
      </div>
      <div class = "audio-input-list-group player_button_group" >
        <button class="video-button audio-input-list-button" title="Audio Input">🎤
        </button>
      </div>
      <div class="screenCapture-group player_button_group">
        <button data-title="screenCapture" class="video-button screenCapture-button" title="screen capture">💻
      </div>
    </div>
    <div class="right-controls">
      <div class="quality-groups player_button_group">
        <button data-title="quality(k)" class="video-button quality-button" title="Quality">%
        </button>
      </div>
      <div class="log-groups player_button_group">
        <button data-title="setting(k)" class="video-button log-button" title="Log">🗨
        </button>
      </div>
      <div class="setting-groups player_button_group">
        <button data-title="setting(k)" class="video-button setting-button" title="setting">⚙
        </button>
      </div>
      <div class="fullscreen-groups player_button_group">
        <button class="video-button fullscreen-button">▣</button>
      </div>
    </div>
  </div>
  <div id="videoInput-modal" class="modal">
    <span class="close">&times;</span>
    <div class="modal-content">
      <h3>Video Input List</h3><br>
      <div class="video-input-list" style= "height: auto; overflow-y: hidden;">
      </div>
    </div>
  </div>
  <div id="audioInput-modal" class="modal">
    <span class="close">&times;</span>
    <div class="modal-content">
      <h3>Audio Input List</h3><br>
      <div class="audio-input-list" style= "height: auto; overflow-y: hidden;">
      </div>
    </div>
  </div>
  <div id="setting-modal" class="modal">
    <span class="close">&times;</span>
    <div class="modal-content">
      <h3>Setting</h3><br>
      <div class="setting-list">
        <div class="codec-input-list">
          <select class="codec-input-selector" >
          <option selected disabled>Codec</option>
          <option value="h264">H264</option>
          <option value="vp8">VP8</option>
          <option value="vp9">VP9</option>
          </select>
        </div>
        <div class="fps-input-list">
          <select class="fps-input-selector">
            <option selected disabled>FPS</option>
            <option value="25">25</option>
          </select>
        </div>
        <div class="resolution-input-list">
          <select class="resolution-input-selector">
            <option selected disabled>Resolution</option>
            <option value="1280x720">1280 x 720</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</div>

`
export default body;