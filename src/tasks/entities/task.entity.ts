import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { Transform } from 'class-transformer';

export class TaskEntity implements Task {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @Transform(({ value }) => value.toString().toUpperCase())
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  isDone: boolean;

  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);

    // short for 👇
    // this.id = partial.id;
    // this.createdAt = partial.createdAt;
    // this.updatedAt = partial.updatedAt;
    // this.name = partial.name;
    // this.description = partial.description;
    // this.price = partial.price;
    // this.sku = partial.sku;
    // this.published = partial.published;
  }
}
