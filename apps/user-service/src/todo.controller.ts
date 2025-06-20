import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

// DTO with validators
export class CreateTodoDto {
  @ApiProperty({ example: 'Buy groceries', description: 'The title of the todo item' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'Milk, Bread, Eggs', description: 'Details about the todo item', required: false })
  @IsString()
  description?: string;
}

// Response DTO
export class TodoResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;
}

let todos: TodoResponseDto[] = [];
let nextId = 1;

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  @Post()
  @ApiOperation({ summary: 'Create a new todo item' })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 201, description: 'The created todo item', type: TodoResponseDto })
  createTodo(@Body() dto: CreateTodoDto): TodoResponseDto {
    const todo: TodoResponseDto = { id: nextId++, ...dto };
    todos.push(todo);
    return todo;
  }

  @Get()
  @ApiOperation({ summary: 'Get all todo items' })
  @ApiResponse({ status: 200, description: 'List of todo items', type: [TodoResponseDto] })
  getAll(): TodoResponseDto[] {
    return todos;
  }
}
