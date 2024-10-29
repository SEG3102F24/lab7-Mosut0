import { Component } from '@angular/core';
import { BooksService } from '../books/service/books.service';
import { Author } from './model/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent {
  authorId: number = 0;
  author: Author | null = null;
  message: string | null = null;

  constructor(private booksService: BooksService) {}

  onSubmit(): void {
    this.booksService.getAuthorById(this.authorId).subscribe({
      next: (data: Author) => {
        this.author = data;
        this.message = null;
      },
      error: (error) => {
        this.author = null;
        if (error.status === 404) {
          this.message = 'Author not found.';
        } else {
          this.message = 'An error occurred while fetching the author.';
        }
      },
    });
  }
}
