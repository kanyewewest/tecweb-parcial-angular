import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IClient } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
})
export class ClientDetailComponent implements OnInit {
  pageTitle = 'Client Detail';
  errorMessage = '';
  client: IClient | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getClient(id);
    }
  }

  getClient(id: number): void {
    this.clientService.getClient(id).subscribe({
      next: (client) => (this.client = client),
      error: (err) => (this.errorMessage = err),
    });
  }

  onBack(): void {
    this.router.navigate(['/clients']);
  }
}
