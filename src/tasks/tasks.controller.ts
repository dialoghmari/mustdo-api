import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return new TaskEntity(await this.tasksService.create(createTaskDto));
  }

  @Get()
  @ApiOkResponse({ type: [TaskEntity] })
  async findAll() {
    const tasks = await this.tasksService.findAll();
    return tasks.map((task) => new TaskEntity(task));
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskEntity })
  async findOne(@Param('id') id: string) {
    return new TaskEntity(await this.tasksService.findOne(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return new TaskEntity(await this.tasksService.update(id, updateTaskDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: TaskEntity })
  async remove(@Param('id') id: string) {
    return new TaskEntity(await this.tasksService.remove(id));
  }
}
