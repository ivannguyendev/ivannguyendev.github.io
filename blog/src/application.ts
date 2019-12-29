import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingScope} from '@loopback/core';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from '@app/sequence';
import {ContentDomain} from '@app/domain';

export class BlogApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
	constructor(options: ApplicationConfig = {}) {
		super(options);

		// Set up the custom sequence
		this.sequence(MySequence);

		// Set up default home page
		this.static('/', path.join(__dirname, '../public'));

		// Customize @loopback/rest-explorer configuration here
		this.bind(RestExplorerBindings.CONFIG).to({
			path: '/explorer',
		});
		this.component(RestExplorerComponent);
		this.bind('domains.ContentDomain')
			.toClass(ContentDomain)
			.inScope(BindingScope.SINGLETON);

		this.projectRoot = __dirname;
		// Customize @loopback/boot Booter Conventions here
		this.bootOptions = {
			controllers: {
				// Customize ControllerBooter Conventions here
				dirs: ['controllers'],
				extensions: ['.controller.js'],
				nested: true,
			},
			// domains: {
			//   dirs: ['domain'],
			//   extensions: ['.domain.js'],
			//   nested: true,
			// }
		};
	}
}
