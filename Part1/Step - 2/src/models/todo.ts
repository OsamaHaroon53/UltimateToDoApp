import { Column, Model, Table, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table
export default class Todo extends Model<Todo> {

  @Column
  title!: string;

  @Column
  description!: string;

  @Column
  done!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
