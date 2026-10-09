import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { RecipeComment } from '../models/comment.modal';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class CommentsComponent implements OnInit {
  @Input({ required: true }) recipeId!: string;

  comments: RecipeComment[] = [];
  newComment = '';
  isLoading = false;
  isSubmitting = false;

  constructor(private readonly commentService: CommentService) { }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.isLoading = true;
    console.log('#### - loaded comments is called: ', this.recipeId);

    this.commentService
      .getComments(this.recipeId)
      .subscribe({
        next: comments => {
          this.comments = comments;
          console.log('#### - loaded comments are: ', this.comments);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  submitComment(): void {
    const comment = this.newComment.trim();
    if (!comment || this.isSubmitting) { return; }

    this.isSubmitting = true;
    console.log('#### - add  comments added: ', comment);

    this.commentService
      .addComment(this.recipeId, comment)
      .subscribe({
        next: createdComment => {
          this.comments.unshift(createdComment);
          this.newComment = '';
          this.isSubmitting = false;
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
  }
}