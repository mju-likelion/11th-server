import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  posts: Post[] = [];

  constructor(private usersService: UsersService) {}

  nextId() {
    return this.posts.length
      ? Math.max(...this.posts.map((post) => post.id)) + 1
      : 1;
  }

  create(userId: string, createPostDto: CreatePostDto) {
    if (!userId) {
      throw new UnauthorizedException('로그인 안하셨잖아요');
    }

    const user = this.usersService.findOne(userId);

    const post = {
      id: this.nextId(),
      writerId: user.userId,
      content: createPostDto.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.posts.push(post);

    return post;
  }

  findAll() {
    return this.usersService.findAll();
  }

  findOne(id: number) {
    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException('그런 id 의 포스트가 없습니다');
    }

    return post;
  }

  update(userId: string, id: number, updatePostDto: UpdatePostDto) {
    if (!userId) {
      throw new UnauthorizedException('로그인 안하셨잖아요');
    }

    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException('그런 id 의 포스트가 없습니다');
    }

    if (post.writerId !== userId) {
      throw new UnauthorizedException('님은 이 글에 권한이 없어영');
    }

    post.content = updatePostDto.content;
    post.updatedAt = new Date();

    return post;
  }

  remove(userId: string, id: number) {
    if (!userId) {
      throw new UnauthorizedException('로그인 안하셨잖아요');
    }

    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException('그런 id 의 포스트가 없습니다');
    }

    if (post.writerId !== userId) {
      throw new UnauthorizedException('님은 이 글에 권한이 없어영');
    }

    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
