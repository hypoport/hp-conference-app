import {Injectable} from '@angular/core';
import {LocalNotifications} from "@ionic-native/local-notifications";

import { Platform } from 'ionic-angular';
import { BluetoothLE } from '@ionic-native/bluetooth-le';

@Injectable()
export class BleService {


  lastBeaconDistance: number = -100;
  scanning: boolean = false;

  lastAction: Date;
  performedActions: any = [];
  availableActions: any = [
    {
      id: 1,
      trigger: -85,
      type: 'notification',
      data: 'Hi! 👋 Willkommen in Mitte I + II'
    },
    {
      id: 2,
      trigger: -70,
      type: 'notification',
      data: 'Finde mich! 🤪'
    },
    {
      id: 3,
      trigger: -55,
      type: 'notification',
      data: 'Warm 🌡️'
    },
    {
      id: 4,
      trigger: -44,
      type: 'notification',
      data: 'Heiß!!! 🔥🔥'
    },
    {
      id: 5,
      trigger: -31,
      type: 'notification',
      data: 'Gefunden! 🤯'
    }
  ];

  constructor(private ble: BluetoothLE, public plt: Platform, private localNotifications: LocalNotifications) {
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
        this.scanning = true;
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
            // @ts-ignore
            if(scanResult && scanResult.status && scanResult.status == "scanResult" && scanResult.name){
                if(scanResult.name.indexOf('ESP32') >= 0){
                    this.beaconActions(scanResult,scanResult.rssi);
                }
            }
        });

        setTimeout(()=>{
          console.log('END SCAN -------------------');
          this.ble.stopScan();
          this.scanning = false;
        },60000);

      });

    });
  }
  /*
    do something with the beacon
  */
  beaconActions(beacon, rssi){

    this.lastBeaconDistance = rssi;
    console.log('detected beacon distance '+rssi);

    this.availableActions.forEach((actions) => {
        if(rssi > actions.trigger && this.performedActions.indexOf(actions.id) == -1){

          // cooldown
          if(!this.lastAction || new Date().getTime() > this.lastAction.getTime() + 1500){

            // send notifications
            if(actions.type == "notification"){
              this.localNotifications.schedule(<any> {
                 id: 1099+actions.id,
                 title: actions.data
              });
            }

            console.log('PERFORM-BLE-ACTION:'+actions.type+' - data'+actions.data+' trigger distance '+actions.trigger+' / rssi '+rssi);
            this.performedActions.push(actions.id);
            this.lastAction = new Date();

          }
        }
    });

  }

}
