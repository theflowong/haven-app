# Haven: Room Interactions

A web app to choose modes and control lights/sound for the Meditation/Prayer Room in the Centre for Digital Media. Built primarily on Javascript, using Philips Hue API.


## Set up & Install

*Note: The code is connected to the HAVEN Room Hue API lights. If you're using another room, you must replace some url's with your own IP address and Hue lights.*

1. Download the file directory. Move the file directory to your ``htdocs`` folder.

2. Open the project in Atom. In ``main.js``, replace the variable ``url_ip`` with your own URL that contains your Hue IP address and Hue ID. If you're not sure what to replace it to, check out Hue's [Getting Started](https://www.developers.meethue.com/documentation/getting-started) documentation.

3. If you haven't already, install sass:
```
$ gem install sass // or sudo gem install sass
```

4. In your Terminal, `cd` to the file directory, and watch sass style changes:
```
$ sass --watch style.scss:style.css
```

5. Open the web app in your localhost. To do this, make sure MAMP is running. My own link is http://localhost:8888/haven-app/, but you should have your own localhost number.
