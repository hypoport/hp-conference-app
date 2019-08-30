export class ConferenceOptions {
  noNotifications: boolean = false;
  favoriteInAgenda: boolean = true;
  markDaysInAgenda: boolean = true;
  keyVisualPlacement: string = 'center center';
  labels: any = {
    homeDirections: 'Veranstaltungsort',
    homeContact: 'Ihr Ansprechpartner',
    sessionRaitingButton: 'Bewerten Sie die Session',
    sessionRaitingInfo: 'Wie fanden Sie die Session? Was können wir besser machen? Wir freuen uns über Ihr Feedback!',
    sessionRaitingPlaceholder: 'Ihre Bewertung…',
    sessionRaitingSuccess: 'Vielen Dank für Ihr Feedback!',
    roombookingTitle: 'Raumbuchungen',
    roombookingInfo: 'Buche hier deinen Raum für bilaterale Gespräche.',
    navInfo: 'Info',
    navAgenda: 'Agenda',
    navSpeaker: 'Sprecher',
    navExhibitor: 'Aussteller',
  };
  roombooking: any = {
    enabled: true,
    template: "Raumplan EP Konferenz 2019",
    browserLink: "",
  };
  filter: any = {
    enabled: true,
    category: true,
    rooms: true
  };
}
