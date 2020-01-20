import platform from "platform";

const statBody= (result) =>`
Resolution: ${result.localFrameWidth} x ${result.localFrameHeight},  
FPS: ${result.nowLocalFrameRate}<br>
BPS: A=${result.ABSent}, V:${result.VBSent}<br>
Audio Level:${result.localAudioLevel},
Energy:${result.localTotalAudioEnergy.toFixed(4)},
<br/>
Codec: A=${result.localAudioCodec}, V=${result.localVideoCodec}, 
Network type:${result.localNetworkType}, link: ${result.localCandidate}
<br/>
RTT: A=${result.audioRtt}, V=${result.videoRtt}, Rating: <b>${result.rating}</b>
<h2>Platform</h2>
name: ${platform.name} ${platform.version}<br>
product: ${platform.manufacturer} ${platform.os} ${platform.product}
`
export default statBody;