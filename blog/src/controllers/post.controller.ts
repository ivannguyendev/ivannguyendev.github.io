import {inject} from '@loopback/core';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {
	post,
	param,
	get,
	getFilterSchemaFor,
	getModelSchemaRef,
	getWhereSchemaFor,
	patch,
	put,
	del,
	requestBody,
	HttpErrors,
} from '@loopback/rest';
import {Post, ButterHookModel, ContentfulHookModel} from '@app/models';
import {ContentDomain} from '@app/domain';

export class PostController {
	constructor(
		@inject('domains.ContentDomain')
		public contentDomain: ContentDomain,
		// @inject('services.logger', {optional: true})
//   private logger : Logger,
	) {}

	// @post('/posts', {
	// 	responses: {
	// 		'200': {
	// 			description: 'Post model instance',
	// 			content: {'application/json': {schema: getModelSchemaRef(Post)}},
	// 		},
	// 	},
	// })
	// async create(
	// 	@requestBody({
	// 		content: {
	// 			'application/json': {
	// 				schema: getModelSchemaRef(Page, {
	// 					title: 'New Page',
	// 					exclude: ['id'],
	// 				}),
	// 			},
	// 		},
	// 	})
	// 	page: Omit<Page, 'id'>,
	// ): Promise<Page> {
	// 	return this.contentDomain.createPage(page, page.fields);
	// }

	// @get('/posts/count', {
	// 	responses: {
	// 		'200': {
	// 			description: 'Post model count',
	// 			content: {'application/json': {schema: CountSchema}},
	// 		},
	// 	},
	// })
	// async count(
	// 	@param.query.object('where', getWhereSchemaFor(Post)) where?: Where<Post>,
	// ): Promise<Count> {
	// 	return this.postRepository.count(where);
	// }

	@get('/posts', {
		responses: {
			'200': {
				description: 'Array of Post model instances',
				content: {
					'applicatiaion/json': {
						schema: {type: 'array', items: getModelSchemaRef(Post)},
					},
				},
			},
		},
	})
	async find(
		@param.query.object('filter', getFilterSchemaFor(Post)) filter?: Filter<Post>,
	): Promise<Post[]> {
		try {
			return await this.contentDomain.findPosts(filter);
		} catch (error) {
			console.error(error)
			throw new HttpErrors.NotFound(
				`Website not found anything that match sentence`,
			  );
		}
	}

	@get('/posts/{slug}', {
		responses: {
			'200': {
				description: 'Post model instance',
				content: {'application/json': {schema: getModelSchemaRef(Post)}},
			},
		},
	})
	async getBySlug(@param.path.string('slug') slug: string): Promise<Post> {
		try {
			return await this.contentDomain.getPostBySlug(slug);
		} catch (error) {
			console.error(error)
			throw new HttpErrors.NotFound(
				`Website not found anything that match for ${slug}`,
			  );
		}
	}

	// @patch('/posts', {
	// 	responses: {
	// 		'200': {
	// 			description: 'Post PATCH success count',
	// 			content: {'application/json': {schema: CountSchema}},
	// 		},
	// 	},
	// })
	// async updateAll(
	// 	@requestBody({
	// 		content: {
	// 			'application/json': {
	// 				schema: getModelSchemaRef(Post, {partial: true}),
	// 			},
	// 		},
	// 	})
	// 	post: Post,
	// 	@param.query.object('where', getWhereSchemaFor(Post)) where?: Where<Post>,
	// ): Promise<Count> {
	// 	return this.postRepository.updateAll(post, where);
	// }

	// @patch('/posts/{id}', {
	// 	responses: {
	// 		'204': {
	// 			description: 'Post PATCH success',
	// 		},
	// 	},
	// })
	// async updateById(
	// 	@param.path.string('id') id: string,
	// 	@requestBody({
	// 		content: {
	// 			'application/json': {
	// 				schema: getModelSchemaRef(Post, {partial: true}),
	// 			},
	// 		},
	// 	})
	// 	post: Post,
	// ): Promise<void> {
	// 	await this.postRepository.updateById(id, post);
	// }

	// @put('/posts/{id}', {
	// 	responses: {
	// 		'204': {
	// 			description: 'Post PUT success',
	// 		},
	// 	},
	// })
	// async replaceById(@param.path.string('id') id: string, @requestBody() post: Post): Promise<void> {
	// 	await this.postRepository.replaceById(id, post);
	// }

	// @del('/posts/{id}', {
	// 	responses: {
	// 		'204': {
	// 			description: 'Post DELETE success',
	// 		},
	// 	},
	// })
	// async deleteById(@param.path.string('id') id: string): Promise<void> {
	// 	await this.postRepository.deleteById(id);
	// }

	@post('/webhooks/buttercms', {
		responses: {
			'200': {
				description: 'Webhook api',
			},
		},
	})
	async webhookButtercms(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(ButterHookModel),
				},
			},
		})
		data: ButterHookModel,
	): Promise<boolean> {
		let newData = data.data;
		let webhook = data.webhook;
		switch (webhook.event) {
			// case 'post.all':
			// 	break;
			case 'post.published':
			case 'post.update':
			case 'post.create':
				let postCreate = await this.contentDomain.createOrUpdate(
					{where: {slug: newData.id}},
					newData,
					newData,
				);
				return true;
			case 'post.delete':
				let postDelete = await this.contentDomain.getPostBySlug(newData.id);
				this.contentDomain.deleteById(postDelete.getId());
				return true;
			default:
				console.log(newData);
				return true;
		}
	}
	@post('/webhooks/contentful', {
		responses: {
			'200': {
				description: 'Webhook api',
			},
		},
	})
	async webhookContentfulcms(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(ContentfulHookModel),
				},
			},
		})
		data: ContentfulHookModel,
	): Promise<boolean> {
		let newData = data.fields;
		let sys = data.sys;
		console.log(data.event, JSON.stringify(data));
		switch (data.event) {
			// case 'ContentManagement.Entry.auto_save':
			// case 'ContentManagement.Entry.create':
			case 'ContentManagement.Entry.publish':
			case 'ContentManagement.Entry.save':
			case 'ContentManagement.Entry.unarchive':
				for (const key in newData) {
					if (newData.hasOwnProperty(key)) {
						const element = newData[key]['en-US'];
						newData[key] = element;
					}
				}
				let newPost = this.contentDomain.cmsHeadless.transformPostModel(newData, sys);
				let postCreate = await this.contentDomain.createOrUpdate(
					{where: {slug: newPost.slug}},
					newPost,
					newPost,
				);
				return true;
			case 'ContentManagement.Entry.delete':
			case 'ContentManagement.Entry.unpublish':
			case 'ContentManagement.Entry.archive':
				// let postDelete = await this.contentDomain.getPostBySlug(sys.id);
				this.contentDomain.deleteById(sys.id);
				return true;
			default:
				return true;
		}
	}
}
