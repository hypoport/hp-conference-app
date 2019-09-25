# Hypoport Conference App for Attendees

Ionic based Hybrid-App, connected to an Event-Backend based on a Wordpress-Plugin, used for conferences of Hypoports B2B-Subsidiaries.

- [x] Display Conferences 
- - [x] Overview and General Information
- - [x] Agenda List 
- - [x] Speaker List 
- - [ ] Aussteller List? 
- [x] Add Conferences trough Conf-Key and Conf-Password
- [x] Add Conferences by scanning Conference QR-Code 
- [x] Save and Load added Conferences in/from Native Storage
- [x] Automatical Reload Conference Data, if they changed
- [x] PushNotifications for next Agenda Points
- [x] Star-Raiting + Review for Sessions
- [ ] Push-Notifications send from backend 
- [ ] Poll after Conferences
- [ ] " Real " Userprofiles
- - [ ] Comments for Sessions
- - [ ] Chat


## env.sample breakdown

```javascript
ENV = {
	apiROOT = API Server for retrieving the conference brand by conference key
	gaKey = GoogleAnalytics-Key
	qrPayloadSecret = Your Secret String for the symetric QR-Code Hasing
	skipBranding = boolean; toggle white-labeling 
	knownBrands = array<string>; array of conference brand keys
	backendUrls = {'brand' => API Url}; The conference backend hosted on a client site
	hotFixUrls = {'oldQRCodeUrl' => 'newQRUrl'}; convert QR-Code to another URL, before reading (cut-candidate)
};
```

## Creating a new brand

1. Add Brand to the "knownBrands" environment variable. Also adding the "backendUrl".

2. Create a `config/brand.*brandshorthand*.config.js`. 

Open it. Change the brand variable to the brand handle:
```js
// https://www.npmjs.com/package/node-sass
let brand = "ep"; // change brand name here
module.exports [...]
```

3. Add `theme/*brandhandle*/variables.scss`

Here you can change the variables and add own brand specific stylings.

4. Add to the npm run-script regen-brands command your new created brand in `package.json`.

```
ionic-app-scripts build --sass ./config/brand.gp.sass.config.js && ionic-app-scripts build --sass ./config/brand.ep.sass.config.js
```

----

External / Backend Preperations for adding brands:

5. Add DB of Conference Plugin to the knwon brand list on tagungsapp.hypoport.de/api/
6. Add in theme functions the filter for the brandhandle. 
`add_filter( 'hp_conv_brand', function(){ return 'ep'; } );`
