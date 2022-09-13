import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less']
})

/**
 * Displays messages.
 */
export class MessagesComponent implements OnInit {

  /**
   * The service to get messages from.
   */
  public readonly messageService: MessageService

  /**
   * Initializes the Messages component.
   * @param messageService The service to get messages from.
   */
  constructor(messageService: MessageService) {

    this.messageService = messageService
  }

  ngOnInit(): void {
  }
}
