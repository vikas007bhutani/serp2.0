import { Injector } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

export abstract class ComponentBase {

  confirmationService: ConfirmationService;
  messageService: MessageService; 

  constructor(injector: Injector) {
    this.confirmationService = injector.get(ConfirmationService);
    this.messageService = injector.get(MessageService);
  }
}
