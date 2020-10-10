import { Component, OnInit } from '@angular/core';
import { IClient } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  pageTitle = 'Client List';
  errorMessage = '';
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredClients = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.clients;
  }

  filteredClients: IClient[] = [];
  clients: IClient[] = [];

  constructor(private clientService: ClientService) {}

  onRatingClicked(message: string): void {
    this.pageTitle = 'Client List: ' + message;
  }

  performFilter(filterBy: string): IClient[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.clients.filter((client: IClient) => {
      return (
        `${client.name} ${client.lastName}`
          .toLocaleLowerCase()
          .indexOf(filterBy) !== -1
      );
    });
  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.filteredClients = this.clients;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
