import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

@Component({
  selector: 'app-internship-room',
  templateUrl: './internship-room.component.html',
  styleUrls: ['./internship-room.component.css']
})
export class InternshipRoomComponent implements OnInit, AfterViewInit {
  roomId: string = "";
  @ViewChild('root')
  root!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomId = params['id'];    });
  }


  ngAfterViewInit() {
    const appID = 1410958778;
    const serverSecret = '563cfc896edef40e23d3fa98fee8adc9';

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.roomId, 'UDG', Date.now().toString());

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: this.root.nativeElement,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
          window.location.protocol + '//' +
          window.location.host + window.location.pathname +
            '?roomId=' + // Modifier le paramètre ici
            this.roomId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  }

  enterRoom() {
    console.log('Room ID:', this.roomId);
    this.router.navigate(['/internshipRoom', this.roomId]);
  }


}
