import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { TokenService } from 'src/app/services/token.service'; // Importez le service TokenService

@Component({
  selector: 'app-internship-room',
  templateUrl: './internship-room.component.html',
  styleUrls: ['./internship-room.component.css']
})
export class InternshipRoomComponent implements OnInit, AfterViewInit {
  roomId: string = "";
  @ViewChild('root')
  root!: ElementRef;
  personalLinkURL: any;
  userId!: any;
  zeroCloudInstance: any; // Déclarez la variable zeroCloudInstance

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userTok: TokenService // Injectez le service TokenService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = params['id'];
    });
  }

  ngAfterViewInit() {
    // Obtenez le token d'authentification de l'utilisateur connecté
    this.userId = this.userTok.currentUser();

    // Vérifiez si this.userId est une chaîne de caractères
    if (typeof this.userId !== 'string') {
      // Convertissez this.userId en chaîne de caractères si nécessaire
      this.userId = this.userId.toString();
    }

    const appID = 1410958778;
    const serverSecret = '563cfc896edef40e23d3fa98fee8adc9';

    // Utilisez le token d'authentification pour rejoindre la salle de stage
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.roomId, this.userId, Date.now().toString());

    // Créez une instance d'objet à partir du jeton Kit
    this.zeroCloudInstance = ZegoUIKitPrebuilt.create(kitToken);

    this.zeroCloudInstance.joinRoom({
      container: this.root.nativeElement,
      sharedLinks: [
        {
          name: 'Personal link',
          url: window.location.href + '?roomId=' + this.roomId + '&userId=' + this.userId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });

    this.personalLinkURL = window.location.href + '?roomId=' + this.roomId + '&userId=' + this.userId;
    console.log(this.personalLinkURL);
  }
}
