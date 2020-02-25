import {Injectable} from '@angular/core';

import { Platform } from 'ionic-angular';
import { BluetoothLE } from '@ionic-native/bluetooth-le';

@Injectable()
export class BleService {


  constructor(private ble: BluetoothLE, public plt: Platform) {
    setTimeout(()=>{
      this.initBleScan();
    },1500);
  }

  initBleScan(){
    console.log('Hello Ble');
    this.plt.ready().then((readySource) => {

      console.log('Platform ready from', readySource);

      this.ble.initialize().then( (blefeedback) => {
        console.log('ble status: ', blefeedback.status) // logs 'enabled'

        try {
        this.ble.startScan(
          {
            "services": null,
            "allowDuplicates": true,
            "scanMode": this.ble.SCAN_MODE_LOW_LATENCY,
            "matchMode": this.ble.MATCH_MODE_AGRESSIVE,
            "matchNum": this.ble.MATCH_NUM_MAX_ADVERTISEMENT,
            "callbackType": this.ble.CALLBACK_TYPE_ALL_MATCHES,
          }
        ).subscribe((scanResult: any)=>{
          console.log('SCAN RESULTS -------------------');

            if(scanResult && scanResult.status && scanResult.status == "scanResult" && scanResult.name){
                /*if(scanResult.name.indexOf('ESP32') >= 0){
                  if(scanResult.rssi){
                    console.log('FOUND BEACON – RSSI');
                  }
                }*/
            }
            console.log(scanResult);



        });

        setTimeout(()=>{
          console.log('END SCAN -------------------');
          this.ble.stopScan();
        },30000);

      } catch(e) {
        console.log("cathed:", e);
      }


      });

    });
  }

}
