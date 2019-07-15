import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the AttendeesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.


  TODO and CAUTION
  It may not work with following booking backend settings:
  - non splitted time slots
  - non flipped axis


 */

class BookingGroup {
    ind: string;
    name: string;
    rooms: any;
    timeslots: any;
}

class BookingRoom {
   key: string;
   name: string;
   disabled: boolean;
 }

class BookingSlot {
   key: string;
   name: string;
   disabled: boolean;
   split: boolean;
   splitIndex: number;
   "info-split-1": boolean;
   "info-split-2": boolean;
 }

@IonicPage()
@Component({
  selector: 'page-roombooking',
  templateUrl: 'roombooking.html',
})
export class RoombookingPage {

  // selected slot
  selectedDay: string = "";
  selectedRoom: string = "";
  selectedSlot: string = "";
  maxRooms: number = 0;

  // bookingData
  email: string = "";
  bookInfo: string = "";

  // backend data
  bookingDays: Array<BookingGroup> = [];
  bookingRooms: Array<BookingRoom> = [];
  bookingSlots: Array<BookingSlot> = [];
  bookedKeys: Array<any> = [];

  // interface stage
  hasData: boolean = false;
  isLoading: boolean = true;

  constructor(private navParams: NavParams,
              private globalProvider: GlobalProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private iab: InAppBrowser,
            private http: HttpClient) {
  }

  ionViewDidEnter(){
    this.loadRooms();
  }


  loadRooms(){
    this.isLoading = true;
    const url = this.globalProvider.apiURL('confrooms/'+this.globalProvider.conferenceId+'/update');
    return this.http.post(url, {
      "conv_id": this.globalProvider.conferenceId,
      "template": this.globalProvider.conferenceOptions.roombooking.template,
    }, {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).toPromise()
      .then((result: any) => {
        this.isLoading = false;
        this.bookingDays = result.groups;
        this.bookedKeys = result.occupations;
        this.updateRoomsAndSlots();
      });
  }

  updateDay(){
    this.selectedRoom = null;
    this.selectedSlot = null;
    this.updateRoomsAndSlots();
  }
  updateRoomsAndSlots(){
    let activeRooms = [];
    let activeSlots = [];
    this.bookingDays.forEach((day)=>{
      if(!this.selectedDay) this.selectedDay = day.ind;
      if(day.ind == this.selectedDay){
        activeRooms = day.rooms.room;
        activeSlots = day.timeslots.time;
      }
    });

    this.bookingSlots = [];
    for(let i = 0; i < activeSlots.length; i++){
        let _slot = activeSlots[i];
        if(_slot.split){
            let _clone1 = new BookingSlot;
            _clone1.key = _slot.key+'-1';
            _clone1.name = _slot['info-split-1'];
            _clone1.split = true;
            _clone1.splitIndex = 1;

            let _bookedTimes = 0;
            for(let r = 0; r < activeRooms.length; r++){
              if(this.bookedKeys.indexOf(activeRooms[r].key+'-'+_clone1.key) != -1) _bookedTimes++;
            }
            if(_bookedTimes < activeRooms.length) this.bookingSlots.push(_clone1);

            let _clone2 = new BookingSlot;
            _clone2.key = _slot.key+'-2';
            _clone2.name = _slot['info-split-2'];
            _clone2.split = true;
            _clone2.splitIndex = 2;

            _bookedTimes = 0;
            for(let r = 0; r < activeRooms.length; r++){
              if(this.bookedKeys.indexOf(activeRooms[r].key+'-'+_clone2.key) != -1) _bookedTimes++;
            }
            if(_bookedTimes < activeRooms.length) this.bookingSlots.push(_clone2);
          } else {
            let _bookedTimes = 0;
            for(let r = 0; r < activeRooms.length; r++){
              if(this.bookedKeys.indexOf(activeRooms[r].key+'-'+_slot.key) != -1) _bookedTimes++;
            }
            if(_bookedTimes < activeRooms.length) this.bookingSlots.push(_slot);
        }
    }

    this.bookingRooms = [];
      for(let r = 0; r < activeRooms.length; r++){
        if(!this.selectedSlot || (this.bookedKeys && this.bookedKeys.indexOf(activeRooms[r].key+'-'+this.selectedSlot) == -1) ) this.bookingRooms.push(activeRooms[r]);
      }

      if(this.selectedRoom){
        if(this.bookedKeys && this.bookedKeys.indexOf(this.selectedRoom+'-'+this.selectedSlot) != -1){
          this.selectedRoom = null;
        }
      }
    return this.bookingRooms;
  }

  bookRoom(){

    let slotKey = "";
    let slotInfo = "";
    let roomName = "";
    let slotName = "";

    this.bookingDays.forEach((day)=>{
      if(day.ind == this.selectedDay){
        let _day = day.name;
        this.bookingRooms.forEach((room)=>{
          if(room.key == this.selectedRoom){
            this.bookingSlots.forEach((slot)=>{
              if(slot.key == this.selectedSlot){
                slotInfo = room.name+' ab '+slot.name+' ('+day.name+')';
                roomName = room.name;
                slotName = slot.name+' ('+day.name+')';
                if(slot.split){
                  slotKey = slot.key.slice(0, -2)+'-'+room.key+'-'+slot.splitIndex;
                } else {
                  slotKey = slot.key+'-'+room.key;
                }
              }
            });
          }
        });
      }
    });

    if(this.bookedKeys && this.bookedKeys.indexOf(this.selectedRoom+'-'+this.selectedSlot) == -1){
      const prompt = this.alertCtrl.create({
        title: 'Buchung bestätigen',
        subTitle: 'Raum '+slotInfo,
        message: "Bitte geben Sie eine E-Mail für diese Buchung an. Sie erhalten eine Bestätigung der Buchung per E-Mail.",
        inputs: [
          {
            name: 'mail',
            value: this.email,
            placeholder: 'E-Mail-Adresse'
          },
          {
            name: 'bookinginfo',
            value: this.bookInfo,
            placeholder: 'Vorname, Nachname und Institution (optional: weitere Bemerkungen)'
          },
        ],
        buttons: [
          {
            text: 'Abbrechen',
            handler: data => {
            }
          },
          {
            text: 'Buchen',
            handler: data => {
              this.email = data.mail;
              this.bookInfo = data.bookinginfo;

              this.isLoading = true;

              const url = this.globalProvider.apiURL('confrooms/'+this.globalProvider.conferenceId+'/add');
              return this.http.post(url, {
                "conv_id": this.globalProvider.conferenceId,
                "template": this.globalProvider.conferenceOptions.roombooking.template,
                "room": slotKey,
                "bookinginformation": this.bookInfo,
                "email": this.email,
                "room_name": roomName,
                "time_name": slotName
              }, {
                headers: {'Content-Type': 'application/json; charset=utf-8'}
              }).toPromise()
                .then((result: any) => {
                  this.isLoading = false;
                  if(result.state == "success"){
                    let toast = this.toastCtrl.create({
                        message: 'Buchung erfolgreich. Sie erhalten in Kürze eine Buchungsbeschätigung per E-Mail.',
                        position: 'top',
                        duration: 10000,
                        showCloseButton: true,
                        closeButtonText: "OK"
                      });
                      toast.present();

                      this.selectedRoom = null;
                      this.selectedSlot = null;
                      this.loadRooms();
                  } else {
                    let toast = this.toastCtrl.create({
                        message: 'Buchung fehlgeschlagen. Raum bereits belegt.',
                        position: 'top',
                        showCloseButton: true,
                        closeButtonText: "OK"
                      });
                      toast.present();

                      this.selectedRoom = null;
                      this.selectedSlot = null;
                      this.loadRooms();
                  }
                });
            }
          }
        ]
      });
      prompt.present();
    } else {
      const alert = this.alertCtrl.create({
        title: 'Slot belegt',
        subTitle: 'Leider ist der gewählte Slot schon belegt. Bitte wählen Sie einen anderen Slot.',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  bookRoomInBrowser(){
    this.iab.create(this.globalProvider.conferenceOptions.roombooking.browserLink,'_system',{location:'no'});
  }
}
