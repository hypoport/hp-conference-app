export class ConferenceOptions {
  noNotifications: boolean = false;
  favoriteInAgenda: boolean = true;
  markDaysInAgenda: boolean = true;
  exhibitors: boolean = false;
  keyVisualPlacement: string = 'center center';
  labels: any = {
    homeDirections: 'Veranstaltungsort',
    homeContact: 'Ihr Ansprechpartner',
    dayInAgenda: 'Konferenztag',
    sessionRaitingButton: 'Bewerten Sie die Session',
    sessionRaitingInfo: 'Wie fanden Sie die Session? Was können wir besser machen? Wir freuen uns über Ihr Feedback!',
    sessionRaitingPlaceholder: 'Ihre Bewertung…',
    sessionRaitingSuccess: 'Vielen Dank für Ihr Feedback!',
    sessionPlusOneSpeaker: 'weitere',
    roombookingTitle: 'Raumbuchungen',
    roombookingInfo: 'Buche hier deinen Raum für bilaterale Gespräche.',
    navInfo: 'Info',
    navAgenda: 'Agenda',
    navSpeaker: 'Sprecher',
    navExhibitor: 'Aussteller',
  };
  roombooking: any = {
    enabled: false,
    template: "Raumplan EP Konferenz 2019",
    browserLink: "",
  };
  filter: any = {
    enabled: true,
    category: true,
    rooms: true
  };
}
