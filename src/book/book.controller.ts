import { Book } from '@prisma/client';
import { BookService } from './book.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

function isValidDateFormat(dateString: string): boolean {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  return regex.test(dateString);
}

@Controller('api/v1/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async postBook(
    @Body() postData: Book,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (
      !postData.title ||
      !postData.summary ||
      !postData.publishedDate ||
      !isValidDateFormat(postData.publishedDate)
    ) {
      res.status(400).json({
        status: 'error',
        message:
          'Invalid data. Title, summary, and publishedDate fields are required.',
        result: null,
      });
    } else {
      const createdBook = await this.bookService.createBook(postData);
      res.status(201).json({
        status: 'success',
        message: 'Book created successfully.',
        result: createdBook,
      });
    }
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: number,
    @Body() postData: Book,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (
      !postData.title ||
      !postData.summary ||
      !postData.publishedDate ||
      !isValidDateFormat(postData.publishedDate)
    ) {
      res.status(400).json({
        status: 'error',
        message:
          'Invalid data. Title, summary, and publishedDate fields are required.',
        result: null,
      });
    } else {
      const updatedBook = await this.bookService.updateBook(id, postData);
      if (!updatedBook) {
        res.status(404).json({
          status: 'error',
          message: `No book found with ID ${id}.`,
          result: null,
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: 'Book updated successfully.',
          result: updatedBook,
        });
      }
    }
  }

  @Delete(':id')
  async deleteBook(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const deletedBook = await this.bookService.deleteBook(id);
    if (!deletedBook) {
      res.status(404).json({
        status: 'error',
        message: `No book found with ID ${id}.`,
        result: null,
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Book deleted successfully.',
        result: deletedBook,
      });
    }
  }

  @Get(':id')
  async getBook(
    @Param('id') id: number,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const book = await this.bookService.getBook(id);
    if (!book) {
      res.status(404).json({
        status: 'error',
        message: `No book found with ID ${id}.`,
        result: null,
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Book found.',
        result: book,
      });
    }
  }

  @Get()
  async getAllBook(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json({
        status: 'success',
        message: 'Books retrieved successfully.',
        result: books,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve books.',
        error: error.message || 'Internal server error',
      });
    }
  }
}
