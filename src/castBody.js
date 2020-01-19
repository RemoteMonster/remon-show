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
        <button data-title="quality(k)" class="video-button quality-button" title="Quality">📊
        </button>
      </div>
      <div class="log-groups player_button_group">
        <button data-title="setting(k)" class="video-button log-button" title="Log">🧾
        </button>
      </div>
      <div class="setting-groups player_button_group">
        <button data-title="setting(k)" class="video-button setting-button" title="setting">🧩
        </button>
      </div>
      <div class="test-groups player_button_group">
        <button data-title="Test Environment" class="video-button test-button" title="Test media environment">🔍
        </button>
      </div>
      <div class="fullscreen-groups player_button_group">
        <button class="video-button fullscreen-button">🟨</button>
      </div>
    </div>
  </div>
  <div id="toast"></div>
  <div id="channelInfoBar"></div>
  <div id="videoInput-modal" class="modal">
    <span class="close">&times;</span>
    <div class="modal-content">
      <h1>Video Input List</h1><br>
      <div class="video-input-list" style= "height: auto; overflow-y: hidden;">
      </div>
    </div>
  </div>
  <div id="test-modal" class="full-modal">
    <span class="close">&times;</span>
    <div class="modal-content">
      <iframe style="width:100%;height:100%;" allow="microphone;camera" src='https://test.webrtc.org/'></iframe>
    </div>
  </div>
  <div id="quality-modal" class="right-top-modal">
    <span class="close">&times;</span>
    <div class="modal-content">
      <h1>Stat</h1><br>
      <div class="stat-box" style= "height: auto; overflow-y: hidden;">
      </div>
    </div>
  </div>
  <div id="audioInput-modal" class="modal">
    <span class="close">&times;</span>
    <div class="modal-content">
      <h1>Audio Input List</h1><br>
      <div class="audio-input-list" style= "height: auto; overflow-y: hidden;">
      </div>
    </div>
  </div>
  <div id="setting-modal" class="modal">
    <span class="close">&times;</span>
    <div class="modal-content">
      <h1>Setting</h1><br>
      <div class="setting-list">
        <div class="codec-input-list">Codec: &nbsp;
          <select class="codec-input-selector" >
          <option selected disabled>Codec ▽</option>
          <option value="h264">H264</option>
          <option value="vp8">VP8</option>
          <option value="vp9">VP9</option>
          </select>
        </div><br>
        <div class="fps-input-list">Frame rate: &nbsp;
          <select class="fps-input-selector">
            <option selected disabled>FPS ▽</option>
            <option value="30">30</option>
            <option value="20">20</option>
            <option value="10">10</option>
          </select>
        </div><br>
        <div class="resolution-input-list">Resolution: &nbsp;
          <select class="resolution-input-selector">
            <option selected disabled>Resolution ▽</option>
            <option value="1280x720">1280 x 720</option>
            <option value="640x480">640 x 480</option>
            <option value="320x240">320 x 240</option>
          </select>
        </div><br>
        <div class="bandwidth-input-list">Max bandwidth(kbPS): &nbsp;
          <select class="bandwidth-input-selector">
            <option selected disabled> ▽ </option>
            <option value="4000">4000</option>
            <option value="3000">3000</option>
            <option value="2000">2000</option>
            <option value="1000">1000</option>
            <option value="700">700</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</div>

`
export default body;