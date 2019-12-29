import {Model, model, property} from '@loopback/repository';
const CONST_WEBHOOKDATA_TOPIC = <const>[
	`ContentManagement.ContentType.create`,
	`ContentManagement.ContentType.save`,
	`ContentManagement.ContentType.publish`,
	`ContentManagement.ContentType.unpublish`,
	`ContentManagement.ContentType.delete`,
	`ContentManagement.Entry.create`,
	`ContentManagement.Entry.save`,
	`ContentManagement.Entry.auto_save`,
	`ContentManagement.Entry.archive`,
	`ContentManagement.Entry.unarchive`,
	`ContentManagement.Entry.publish`,
	`ContentManagement.Entry.unpublish`,
	`ContentManagement.Entry.delete`,
	`ContentManagement.Asset.create`,
	`ContentManagement.Asset.save`,
	`ContentManagement.Asset.auto_save`,
	`ContentManagement.Asset.archive`,
	`ContentManagement.Asset.unarchive`,
	`ContentManagement.Asset.publish`,
	`ContentManagement.Asset.unpublish`,
	`ContentManagement.Asset.delete`,
];
type TWebhookDataTopic = typeof CONST_WEBHOOKDATA_TOPIC[number];

@model({settings: {strict: false}})
export class ContentfulHookModel extends Model {
	@property()
	sys: any;
	@property()
	fields: any;
	@property({
		type: 'string',
		jsonSchema: {
			enum: CONST_WEBHOOKDATA_TOPIC,
		},
	})
	topic: TWebhookDataTopic;
	// Define well-known properties here

	// Indexer property to allow additional data
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;

	constructor(data?: Partial<ContentfulHookModel>) {
		super(data);
	}
}

export interface ContentfulHookModelRelations {
	// describe navigational properties here
}

export type ContentfulHookModelWithRelations = ContentfulHookModel & ContentfulHookModelRelations;
