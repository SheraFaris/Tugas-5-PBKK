import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Render,
  Redirect,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @Render('index')
  async index() {
    const posts = await this.postsService.findAll();
    return { posts };
  }

  @Get('new')
  @Render('new')
  newPost() {
    return {};
  }

  @Get(':id')
  @Render('show')
  async show(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    return { post };
  }

  @Get(':id/edit')
  @Render('edit')
  async edit(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    return { post };
  }

  @Get(':id/reply')
  @Render('reply')
  async reply(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    return { post };
  }

  @Post()
  @Redirect('/posts')
  async create(@Body() createPostDto: CreatePostDto) {
    await this.postsService.create(createPostDto);
    return;
  }

  @Post(':id')
  @Redirect()
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    await this.postsService.update(id, updatePostDto);
    return { url: `/posts/${id}` };
  }

  @Post(':id/delete')
  @Redirect('/posts')
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
    return;
  }
}
