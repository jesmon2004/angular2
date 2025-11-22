import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,DatePipe],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
   today = new Date();
}
 