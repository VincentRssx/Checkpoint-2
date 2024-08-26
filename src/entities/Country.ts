import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id?: number;

	@Field()
	@Column()
	code?: string;

	@Field()
	@Column()
	name?: string;

	@Field()
	@Column()
	emoji?: string;

	@Field()
	@Column({ nullable: true })
	continentCode?: string;
}
