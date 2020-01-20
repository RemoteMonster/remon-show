# RemonShow - Simple HTML5 Video Studio


> RemonShow is a web video studio built from the ground up for an HTML5 world. It support HTML5 and RemoteMonster SDK. It supports input devices control and many constraints on desktops and mobile devices. With RemonShow, You can make a live streaming service with *WebRTC* very easy.
![screen shot](screen.png)

## Table of Contents
* [Quick Start](#quick-start)
* [Parameters](#parameters)
* [License](#license)

## Quick Start
Add these tags to your document's `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@remotemonster/remonshow-mini.min.js"></script>
```
> For the latest version of RemonShow and URLs to use, check out the document page on our website.

Next, using RemonShow is as simple as creating a `<video>` element, but with an additional 'data-setup' attribute. At a minimum, this attribute must have a value of `'{serviceId, key}'`.

```html
<!-- remon-cast for live streaming cast -->
<remon-cast key="1234567890" serviceId="SERVICEID1" 
  listener="myListener" poster="img/poster.jpg">
</remon-cast>
<!-- remon-call for P2P call -->
<remon-call key="1234567890" serviceId="SERVICEID1" 
  listener="myListener" poster="img/poster.jpg">
</remon-call>
```

When the page loads, RemonShow will find this element and automatically setup a studio in its place.
You can set up additional parameters:
 * listener: You can register a function that can receive various events that occur in Remonshow.
 * poster: You can select the image you see on the screen when it is launched for the first time.
 * channelId: If there is no setting, the id of the channel will be made random. If you want to specify the id of the broadcast in advance, set the channelId.

## License

RemonShow is licensed under the MIT.