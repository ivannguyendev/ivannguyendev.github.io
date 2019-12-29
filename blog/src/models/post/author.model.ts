import {Model, model, property} from '@loopback/repository';
const CONST_AUTHOR_STATUS = <const>['draft', 'published', 'hidden'];
type TAuthorStatus = typeof CONST_AUTHOR_STATUS[number];
const DefaultAuthorStatus = 'draft';

@model({settings: {strict: false}})
export class AuthorModel extends Model {
	@property({
		type: 'string',
	})
	first_name: string;
	@property({
		type: 'string',
	})
	last_name: string;
	@property({
		type: 'string',
	})
	email: string;
	@property({
		type: 'string',
		required: true,
		index: true,
	})
	slug: string;
	@property({
		type: 'string',
		default: 'This is my bio.',
	})
	bio: string;
	@property({
		type: 'string',
		required: true,
		jsonSchema: {
			maxLength: 50,
			minLength: 5,
		},
	})
	title: string;
	@property({
		type: 'string',
	})
	linkedin_url: string;
	@property({
		type: 'string',
	})
	facebook_url: string;
	@property({
		type: 'string',
	})
	pinterest_url: string;
	@property({
		type: 'string',
	})
	instagram_url: string;
	@property({
		type: 'string',
	})
	twitter_handle: string;
	@property({
		type: 'string',
	})
	profile_image: string;
	@property({
		type: 'string',
		required: true,
		index: true,
		jsonSchema: {
			enum: CONST_AUTHOR_STATUS,
		},
		default: DefaultAuthorStatus,
	})
	status: string;
	@property({
		type: 'date',
		default: Date.now,
	})
	created_at: Date;
	@property({
		type: 'date',
	})
	published_at: Date;

	// Define well-known properties here

	// Indexer property to allow additional data
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;

	constructor(data?: Partial<AuthorModel>) {
		super(data);
	}
}

export interface AuthorModelRelations {
	// describe navigational properties here
}

export type AuthorModelWithRelations = AuthorModel & AuthorModelRelations;
