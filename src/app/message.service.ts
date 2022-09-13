import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Queries application messages.
 */
export class MessageService {

  /**
   * Messages added by the application.
   */
  private messages: string[]

  /**
   * Initializes the MessageService class.
   */
  constructor() {

    this.messages = []
  }

  public getMessages(): string[] {

    return this.messages
  }

  /**
   * Adds a message to the service.
   * @param message The message to add.
   */
  public add(message: string) {

    this.messages.push(message)
  }

  /**
   * Clears the services current messages instance.
   */
  public clear() {

    this.messages = []
  }
}
