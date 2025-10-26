# Lightbox

## Software
This is a very very simple app for a lightbox kiosk I made for my girlfriend.

This is designed to be run locally on a raspberry pi. The node server exposes two endpoints: `/kiosk` and `/`. 

`/kiosk` connects to the server via SSE at the endpoint `/kiosk/sse` and remains indefinitely open. On the bottom right it also displays the IP address of the server. 

`/` is for the settings. Accessible on the same network, anyone can go on and change the background color, upload an image, and change the scale of the image. 

This was made in about an hour so it isn't scalable, has no validation, stores the image in memory in base64, and should only be run on a single server locally... But it does the job!

## Hardware
For the physical lightbox, I used an old monitor and raspberry pi I had lying around. Finally, after all these years a use for the over-hyped raspberry pi!

I built a frame/enclosure for the monitor using some scrap wood. To avoid damaging the screen, I had an old painting sitting in the shed. I took the glass from it, cut it to the size of the monitor, and fit it on top. Voila, a lightbox! 

I set the raspi up to run the server, enter kiosk mode in chromium, and go to the url `/kiosk`. Since the raspberry pi has some GPIO pins, I added a tiny little button that just refreshses the page (f5). I did this because sometimes the page would lose connection to the SSE. Yes, I added a physical button instead of implementing re-connection logic to the SSE endpoint. It's amazing how much you can get away with when you don't have to care for scale, authentication, validation, or anything as a matter of fact. 