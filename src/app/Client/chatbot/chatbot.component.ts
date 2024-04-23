import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage: string = '';
  chatMessages: { content: string, role: string, showRatingButtons: boolean }[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    const message = { message: this.userMessage };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post<any>('http://localhost:8000/chat', message, { headers })
      .subscribe(response => {
        console.log(response);
        this.chatMessages.push({ content: response.response, role: 'response', showRatingButtons: this.shouldShowRatingButtons(response.tag) });
      }, error => {
        console.error('HTTP Error:', error);
        // Handle error message or display it to the user
      });

    this.chatMessages.push({ content: this.userMessage, role: 'user', showRatingButtons: false });
    this.userMessage = '';
  }

  sendRating(message: { content: string, role: string, showRatingButtons: boolean, selectedRating?: number }, rating: number) {
    console.log('Selected rating:', rating);
    // Send rating to backend if needed
    message.showRatingButtons = false; // Hide rating buttons after sending the rating
    message.selectedRating = rating; // Update the selected rating
  }
  shouldShowRatingButtons(tag: string): boolean {
    return tag === 'ask_feedback' || tag === 'positive_feedback' || tag === 'negative_feedback';
  }
}
