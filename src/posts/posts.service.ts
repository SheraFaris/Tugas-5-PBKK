import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    // Get all posts that are NOT replies (replyToId is null)
    const posts = await this.prisma.post.findMany({
      where: {
        replyToId: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        replies: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    return posts;
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        replyTo: true,
        replies: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
    return post;
  }

  async create(createPostDto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: createPostDto,
    });
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
    return post;
  }

  async remove(id: string) {
    // Delete all replies to this post first
    await this.prisma.post.deleteMany({
      where: { replyToId: id },
    });
    
    // Then delete the post itself
    const post = await this.prisma.post.delete({
      where: { id },
    });
    return post;
  }
}
