import { PrismaService } from 'src/prisma.service';
import { Book } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async getAllBooks(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async getBook(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { id: Number(id) } });
  }

  async createBook(data: Book): Promise<Book> {
    return this.prisma.book.create({
      data,
    });
  }

  async updateBook(id: number, data: Book): Promise<Book> {
    return this.prisma.book.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        summary: data.summary,
        publishedDate: data.publishedDate
      },
    });
  }

  async deleteBook(id: number): Promise<Book> {
    return this.prisma.book.delete({
      where: { id: Number(id) },
    });
  }
}
