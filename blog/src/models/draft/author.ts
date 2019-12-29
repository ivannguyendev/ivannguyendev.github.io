import {Entity, model, property} from '@loopback/repository';

export const CONST_AUTHOR_STATUS = <const>['draft', 'published', 'hidden'];
export type TAuthorStatus = typeof CONST_AUTHOR_STATUS[number];
export const DefaultAuthorStatus = 'draft';

@model()
export class Author extends Entity {
	@property({
		type: 'string',
		id: true,
		index: true,
		required: true,
	})
	id: string;
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

	constructor(data?: Partial<Author>) {
		super(data);
	}
}

export interface AuthorRelations {
	// describe navigational properties here
}

export type AuthorWithRelations = Author & AuthorRelations;
