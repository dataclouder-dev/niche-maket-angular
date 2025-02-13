import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sendOutline, sendSharp, send } from 'ionicons/icons';
import {
  ConversationUserSettings,
  ConversationPromptSettings,
  ChatRole,
  ConversationCardListsComponent,
  AudioSpeed,
  IAgentCard,
} from '@dataclouder/conversation-system';
import { NavigationExtras, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { NotionService } from '../../tasks/services/notion.service';
import { ToastAlertService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, ConversationCardListsComponent],
})
export class ChatComponentPage {
  public conversationUserSettings: ConversationUserSettings = {
    realTime: false,
    repeatRecording: false,
    fixGrammar: false,
    superHearing: false,
    voice: 'default',
    autoTranslate: false,
    highlightWords: false,
    synthVoice: false,
    modelName: '',
    provider: '',
    speed: AudioSpeed.Regular,
    speedRate: 1,
  };

  public ConversationPromptSettings: ConversationPromptSettings = {
    messages: [
      { role: ChatRole.System, content: 'you are a helpful assistant talking about fruits, vegetables and similar' },
      {
        role: ChatRole.Assistant,
        content: 'hello! How can I assist you today, do you want to know about fruits?',
      },
    ],
  };

  messages: any[] = [];
  newMessage: string = '';

  constructor(private router: Router, private notionService: NotionService, private toastAlert: ToastAlertService) {
    addIcons({ send, sendOutline, sendSharp });
  }

  public getCustomButtons(card: IAgentCard): MenuItem[] {
    // 🥛 powerfull use of closures
    // [getCustomButtons]: its really hard to explain but, since it use speeddial, i can pass data it self only funtions, and the only way to pass is at initialization time [model]="getCustomButtons(card)"
    // so that why i'm passing a closure function, that means that the command/function will be created with params at the moment of the initialization
    // and becouse i'm using function in this context and in to bind(this) -> getCustomButtons.bind(this)
    return [
      {
        // one param is already hardcode and event is to get the original event
        label: 'Crear Página Notion',
        icon: 'pi pi-address-book',
        command: event => this.handleMenuAction(event, 'createNotionPage', card),
      },
    ];
  }

  public goToDetails(idCard: any) {
    console.log('goToDetails', idCard);
    const navigationExtras: NavigationExtras = {
      state: {
        conversation: idCard,
      },
    };
    this.router.navigate(['/page/stack/conversation-details', idCard], navigationExtras);
  }

  public goToEdit(idCard: any) {
    if (idCard) {
      this.router.navigate(['/page/stack/conversation-form', idCard]);
    } else {
      this.router.navigate(['/page/stack/conversation-form']);
    }
  }

  public handleMenuAction(event: any, action: string, card: IAgentCard) {
    debugger;
    // const card = data.card; // The card data will be passed from the template
    switch (action) {
      case 'createNotionPage':
        console.log('Creating Notion page:', card);
        this.createNotionPage(card);
        break;
    }
  }

  public async createNotionPage(card: IAgentCard) {
    this.toastAlert.info({ title: 'Creando página Notion para tu agente', subtitle: 'Por favor, espere...' });

    console.log('Creating Notion page:', card);
    const response = await this.notionService.createNotionPage(card);
    console.log('Response:', response.page);
    if (response.success) {
      window.open(response.page.url, '_blank');
      this.toastAlert.success({ title: 'Página Notion creada correctamente', subtitle: 'Puedes verla en tu Notion' });
    } else {
      this.toastAlert.error({ title: 'Error al crear la página Notion', subtitle: response.error });
    }
  }
}
