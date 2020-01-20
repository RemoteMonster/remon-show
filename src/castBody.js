const body = `
<div class="player" style="background:gray;">
  <video id = "localVideo" class="viewer" autoplay muted playsinline></video>
  <div class="video-controls">
    <div class="left-controls">
      <button class="video-button toggle" style="font-size:1.6em;" title="Toggle Play">▶</button>
      <button class="video-button video-input-list-button" title="Video Input">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video" 
          role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" 
          class="icon-button">
          <path fill="currentColor" d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z" class="">
          </path>
        </svg>
      </button>
      <button class="video-button audio-input-list-button" title="Audio Input">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="microphone" 
          role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="icon-button">
          <path fill="currentColor" d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z" class="">
        </path>
        </svg>
      </button>
      <div class="screenCapture-group player_button_group">
        <button data-title="screenCapture" class="video-button screenCapture-button" title="screen capture">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="desktop" 
          role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="icon-button">
          <path fill="currentColor" d="M528 0H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h192l-16 48h-72c-13.3 0-24 10.7-24 24s10.7 24 24 24h272c13.3 0 24-10.7 24-24s-10.7-24-24-24h-72l-16-48h192c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-16 352H64V64h448v288z" class="">
        </path></svg>
        </button>
      </div>
    </div>
    <div class="right-controls">
      <div class="quality-groups player_button_group">
        <button data-title="quality(k)" class="video-button quality-button" title="Quality">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-bar" role="img" 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon-button">
            <path fill="currentColor" d="M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" class=""></path>
          </svg>
        </button>
      </div>
      <div class="log-groups player_button_group">
        <button data-title="setting(k)" class="video-button log-button" title="Log">
        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-alt" role="img" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 384 512" class="icon-button"><path fill="currentColor" d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z" class="">
        </path>
        </svg>
        </button>
      </div>
      <div class="setting-groups player_button_group">
        <button data-title="setting(k)" class="video-button setting-button" title="setting">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cog" 
          role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon-button"><path fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" class=""></path></svg>
        </button>
      </div>
      <div class="test-groups player_button_group">
        <button data-title="Test Environment" class="video-button test-button" title="Test media environment">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ambulance" role="img" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 640 512" class="icon-button">
          <path fill="currentColor" d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v320c0 26.5 21.5 48 48 48h16c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm144-248c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48zm176 248c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z" class="">
          </path>
        </svg>
        </button>
      </div>
      <div class="fullscreen-groups player_button_group">
        <button class="video-button fullscreen-button">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrows-alt" 
            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon-button"><path fill="currentColor" d="M352.201 425.775l-79.196 79.196c-9.373 9.373-24.568 9.373-33.941 0l-79.196-79.196c-15.119-15.119-4.411-40.971 16.971-40.97h51.162L228 284H127.196v51.162c0 21.382-25.851 32.09-40.971 16.971L7.029 272.937c-9.373-9.373-9.373-24.569 0-33.941L86.225 159.8c15.119-15.119 40.971-4.411 40.971 16.971V228H228V127.196h-51.23c-21.382 0-32.09-25.851-16.971-40.971l79.196-79.196c9.373-9.373 24.568-9.373 33.941 0l79.196 79.196c15.119 15.119 4.411 40.971-16.971 40.971h-51.162V228h100.804v-51.162c0-21.382 25.851-32.09 40.97-16.971l79.196 79.196c9.373 9.373 9.373 24.569 0 33.941L425.773 352.2c-15.119 15.119-40.971 4.411-40.97-16.971V284H284v100.804h51.23c21.382 0 32.09 25.851 16.971 40.971z" class=""></path></svg>
        </button>
      </div>
    </div>
  </div>
  <div id="toast"></div>
  <div id="channelInfoBar"></div>
  <div id="videoInput-modal" class="left-modal">
    <span class="close">&times;</span>
    <div class="modal-body">
      <h1>Video Input List</h1><br>
      <div class="video-input-list" style= "height: auto; overflow-y: hidden;">
      </div>
    </div>
  </div>
  <div id="test-modal" class="full-modal">
    <span class="close">&times;</span>
    <div class="modal-body">
      <iframe style="width:100%;height:100%;" allow="microphone;camera" src='https://test.webrtc.org/'></iframe>
    </div>
  </div>
  <div id="quality-modal" class="right-top-modal">
    <span class="close">&times;</span>
    <div class="modal-body">
      <h1>Stat</h1><br>
      <div class="stat-box" style= "height: auto; overflow-y: hidden;">
      </div>
    </div>
  </div>
  <div id="audioInput-modal" class="left-modal">
    <span class="close">&times;</span>
    <div class="modal-body">
      <h1>Audio Input List</h1><br>
      <div class="audio-input-list" style= "height: auto; overflow-y: hidden;">
      </div>
    </div>
  </div>
  <div id="setting-modal" class="left-modal">
    <span class="close">&times;</span>
    <div class="modal-body">
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