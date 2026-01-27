import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  employeeId: number = 1;
  employee: Employee | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) {}

  getEmployee() {
    this.loading = true;
    this.error = '';
    this.employee = null;

    this.http.get<Employee>(`http://localhost:3000/api/employees/${this.employeeId}`)
      .subscribe({
        next: (data) => {
          this.employee = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Employee not found';
          this.loading = false;
        }
      });
  }
}
