# [soundcloud-open-in-app-app](http://soundcloudapp.ars.is)


bookmarklet to open a track from soundcloud.com in the mobile app (iOS and Android)

<http://soundcloudapp.ars.is>

## API <small>How does it work?</small>

### `{slug}`

**Parameter:** just the "slug" of a track's `URL` (i.e. the part after `soundcloud.com`).

Redirects to a special URL <small>(`soundcloud://tracks:{id}`)</small>,  
which will open the SoundCloud App on `iOS` and `Android` devices.

**Can be used without a bookmarklet, by just editing the `URL` in your browser.**  
Just change `soundcloud.com` to `soundcloudapp.ars.is` (replace **`.com`** with **`app.ars.is`**).

**Important:** `HTTP` only!

#### **URL:** 

`http://soundcloudapp.ars.is/go/{soundcloud_url}`

#### Example Link

<small><code><http://soundcloudapp.ars.is/ninja-tune/solid-steel-radio-show-20-12-1></code></small>

## Meta

-   Code on
    [`github`](https://github.com/eins78/soundcloud-open-in-app-app); Open Source, `MIT` License
-   [`node.js`](http://nodejs.org), [`express`](http://expressjs.com), [`request`](https://npmjs.org/package/request)
-   [`bootstrap`](http://getbootstrap.com), [`bootstrap-theme-cirrus`](http://code.divshot.com/bootstrap-theme-cirrus/)
-   runs for free on [`heroku`](http://heroku.com)
-   No affiliation with [`SoundCloud`](http://soundcloud.com); but uses their [`API`](http://dev.soundcloud.com/docs/api/reference#resolve)