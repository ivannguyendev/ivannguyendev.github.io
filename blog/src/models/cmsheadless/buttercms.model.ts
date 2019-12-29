import {Model, model, property} from '@loopback/repository';
const CONST_WEBHOOKDATA_STATUS = <const>[
	'post.all',
	'post.published',
	'post.create',
	'post.update',
	'post.delete',
	'page.all',
	'page.create',
	'page.update',
	'page.delete',
	'collection.update',
];
type TWebhookDataStatus = typeof CONST_WEBHOOKDATA_STATUS[number];

@model({settings: {strict: false}})
class WebhookDataModel extends Model {
	@property({
		type: 'string',
		jsonSchema: {
			enum: CONST_WEBHOOKDATA_STATUS,
		},
	})
	event: TWebhookDataStatus;
	@property({
		type: 'string',
	})
	target: string;
	// Define well-known properties here

	// Indexer property to allow additional data
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;

	constructor(data?: Partial<ButterHookModel>) {
		super(data);
	}
}

@model({settings: {strict: false}})
export class ButterHookModel extends Model {
	@property()
	data: any;
	@property()
	webhook: WebhookDataModel;
	// Define well-known properties here

	// Indexer property to allow additional data
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;

	constructor(data?: Partial<ButterHookModel>) {
		super(data);
	}
}

export interface ButterHookModelRelations {
	// describe navigational properties here
}

export type ButterHookModelWithRelations = ButterHookModel &
	ButterHookModelRelations;
