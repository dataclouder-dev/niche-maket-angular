import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DcConversationCardDetailsComponent, IAgentCard } from '@dataclouder/conversation-system';

@Component({
  selector: 'app-conversation-details',
  templateUrl: './conversation-details.component.html',
  styleUrls: ['./conversation-details.component.scss'],
  standalone: true,
  imports: [CommonModule, DcConversationCardDetailsComponent, ButtonModule],
})
export class ConversationDetailsPage implements OnInit {
  conversationId: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    // First try to get from state
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { conversation: any };
    if (state?.conversation) {
      this.conversationId = state.conversation;
    } else {
      // If not in state, get from path params
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.conversationId = params['id'];
        }
      });
    }
  }

  ngOnInit() {
    if (!this.conversationId) {
      this.router.navigate(['/page/chat']);
    }
  }

  public startConversation(card: IAgentCard) {
    console.log('startConversation', card);
    this.router.navigate(['/page/stack/chat', card._id], {
      state: {
        conversation: card,
      },
    });
  }

  public startTask() {
    console.log('startTask', this.conversationId);
    alert('startTask');
    debugger;
  }
}
