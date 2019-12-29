import {Model, model, property} from '@loopback/repository';
const CONST_CATEGORY_STATUS = <const>['draft', 'published', 'hidden'];
type TCategoryStatus = typeof CONST_CATEGORY_STATUS[number];
const DefaultCategoryStatus = 'draft';

@model({settings: {strict: false}})
export class CategoryModel extends Model {
	@property({
		type: 'string',
		required: true,
		index: true,
	})
	slug: string;
	@property({
		type: 'string',
		required: true,
		jsonSchema: {
			maxLength: 100,
			minLength: 5,
		},
	})
	name: string;
	@property({
		type: 'string',
	})
	description: string;
	@property({
		type: 'string',
	})
	seo_title: string;
	@property({
		type: 'string',
		required: true,
		index: true,
		jsonSchema: {
			enum: CONST_CATEGORY_STATUS,
		},
		default: DefaultCategoryStatus,
	})
	status: string;
	@property({
		type: 'string',
	})
	thumbnail_image: string;
	@property({
		type: 'string',
	})
	url: string;
	@property({
		type: 'date',
		default: Date.now,
	})
	created_at: Date;
	@property({
		type: 'date',
	})
	published_at: Date;
	@property({
		type: 'string',
	})
	type: string;

	// Define well-known properties here

	// Indexer property to allow additional data
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;

	constructor(data?: Partial<CategoryModel>) {
		super(data);
	}
}

export interface CategoryModelRelations {
	// describe navigational properties here
}

export type CategoryModelWithRelations = CategoryModel & CategoryModelRelations;
