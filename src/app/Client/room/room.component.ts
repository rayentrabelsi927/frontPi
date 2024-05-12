import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  roomId: string = "";
  userId: number = 0; // Initialize userId to a default value
  @ViewChild('root')
  root!: ElementRef;
  personalLinkURL: any;
  zeroCloudInstance: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userTok: TokenService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = params['id'];
      this.userId = this.userTok.currentUser() || 0; // Get unique user ID or use default value
    });
  }

  ngAfterViewInit() {
    if (!this.roomId) {
      console.error('Room ID not found.');
      return;
    }

    const appID = 1410958778;
    const serverSecret = '563cfc896edef40e23d3fa98fee8adc9';

    // Generate the kit token using the user ID
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.roomId, String(this.userId), Date.now().toString());

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