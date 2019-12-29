import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {AuthorModel, AuthorModelWithRelations} from '@app/models/post/author.model';
import {CategoryModel, CategoryModelWithRelations} from '@app/models/post/category.model';

const CONST_POST_STATUS = <const>['draft', 'published', 'hidden'];
type TPostStatus = typeof CONST_POST_STATUS[number];
const DefaultPostStatus = 'draft';

@model({settings: {strict: false, forceId: false}})
export class Post extends Entity {
	@property({
		type: 'string',
		id: true,
		index: true,
		required: true,
		forceId: false,
		defaultFn: 'uuidv4',
	})
	id: string;
	@property({
		type: 'string',
		required: true,
		index: true,
	})
	slug: string;
	@property({
		type: 'string',
	})
	url: string;
	@property({
		type: 'date',
	})
	published_at: Date;
	@property({
		type: 'date',
		default: Date.now,
	})
	created_at: Date;
	@property({
		type: 'string',
		required: true,
		index: true,
		jsonSchema: {
			enum: CONST_POST_STATUS,
		},
		default: DefaultPostStatus,
	})
	status: TPostStatus;
	@property({
		type: 'string',
		required: true,
		jsonSchema: {
			maxLength: 100,
			minLength: 5,
		},
	})
	title: string;
	@property({
		type: 'string',
	})
	body: string;
	@property({
		type: 'string',
	})
	summary: string;
	@property({
		type: 'string',
	})
	seo_title: string;
	@property({
		type: 'string',
	})
	meta_description: string;
	@property({
		type: 'string',
	})
	featured_image: string;
	@property()
	author: AuthorModel;
	@property()
	category: CategoryModel;
	@property.array(CategoryModel)
	tags: CategoryModel[];
	@property()
	attachments: any;
	// Define well-known properties here

	// Indexer property to allow additional data
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;

	constructor(data?: Partial<Post>) {
		super(data);
	}
}

export interface PostRelations {
	// describe navigational properties here
}

export type PostWithRelations = Post & PostRelations;
