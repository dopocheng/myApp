import { Component } from '@angular/core';

import {ChatPage} from '../chat/chat';
import {DiscoveryPage} from '../discovery/discovery';
import {NotificationPage} from '../notification/notification';
import {MorePage} from '../more/more';
import {HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabDiscovery = DiscoveryPage;
  tabChat = ChatPage;
  tabNotification = NotificationPage;
  tabMore = MorePage;

  constructor() {

  }
}
